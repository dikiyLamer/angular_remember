import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { RemindDates } from '../shared/enums/cron.enums';
import { Note } from '../shared/interfaces/Note';
import { BehaviorSubject } from 'rxjs';
import { DataStorageKeys } from '../shared/enums/data.enums';
import { Remind } from '../shared/interfaces/Remind';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { v4 } from 'uuid';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class ReminderService {
  private reminds$ = new BehaviorSubject<Remind[]>(this.getReminds());
  private intervals = new Map<string, any>();

  constructor(
    private localStorageService: LocalStorageService,
    private notification: NzNotificationService
  ) {}

  getAllReminds() {
    return this.reminds$.asObservable();
  }

  createInterval(note: Note) {
    const id = v4();
    const remind: Remind = {
      date: moment().format('YYYY-MM-DD HH:mm'),
      id,
      note,
    };
    this.setReminds([...this.getReminds(), remind]);
    let interval;
    switch (note.whenRemind) {
      case RemindDates.SECOND:
        interval = setInterval(() => this.remindFn(note.title), 1000);
        this.intervals.set(note.id!, interval);
        break;
      case RemindDates.MINUTE:
        interval = setInterval(() => this.remindFn(note.title), 60 * 1000);
        this.intervals.set(note.id!, interval);
        break;
      case RemindDates.HOUR:
        interval = setInterval(() => this.remindFn(note.title), 60 * 60 * 1000);
        this.intervals.set(note.id!, interval);
        break;
      case RemindDates.DAY:
        interval = setInterval(
          () => this.remindFn(note.title),
          24 * 60 * 60 * 1000
        );
        this.intervals.set(note.id!, interval);
        break;
    }
  }

  deleteInterval(note: Note) {
    const interval = this.intervals.get(note.id!);
    if (!interval) {
      return;
    }
    clearInterval(interval);
    const reminds = this.getReminds();
    const newReminds = reminds.filter((elem) => elem.note.id !== note.id);
    this.setReminds(newReminds);
  }

  private setReminds(reminds: Remind[]): void {
    this.localStorageService.setItem(
      DataStorageKeys.REMIND,
      JSON.stringify(reminds)
    );
    this.reminds$.next(reminds);
  }

  private getReminds(): Remind[] {
    const rawData = this.localStorageService.getItem(DataStorageKeys.REMIND);

    if (rawData) {
      return JSON.parse(rawData);
    }
    return [];
  }

  remindFn(data: string) {
    this.notification.blank(data, '');
  }

  restartIntervals() {
    const reminds = this.getReminds();

    for (let remind of reminds) {
      const { note } = remind;
      const interval = setInterval(() => this.remindFn(note.title), 1000);
      this.intervals.set(note.id!, interval);
    }
  }
}
