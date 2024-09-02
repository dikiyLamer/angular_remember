import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ReminderService } from 'src/app/services/reminder.service';
import { Remind } from 'src/app/shared/interfaces/Remind';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.less'],
})
export class ReminderComponent {
  reminds$: Observable<Remind[]>;
  constructor(private reminderService: ReminderService) {
    this.reminds$ = reminderService.getAllReminds();
  }
}
