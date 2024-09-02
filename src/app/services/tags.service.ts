import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { DataStorageKeys } from '../shared/enums/data.enums';
import { Tag } from '../shared/interfaces/Tag';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 } from 'uuid';
import { NotesService } from './notes.service';

@Injectable({ providedIn: 'root' })
export class TagsService {
  constructor(
    private localStorageService: LocalStorageService,
    private notesService: NotesService
  ) {}
  private currentTags$ = new BehaviorSubject<Tag[]>(this.getTags());
  createTag(data: Tag) {
    data.id = v4();
    const tags = this.getTags();
    const newTags = [...tags, data];
    this.setTags(newTags);
  }

  updateTag(data: Tag) {
    const tags = this.getTags();
    const newTags = tags.map((tag) => {
      if (data.id === tag.id) {
        return data;
      }
      return tag;
    });
    this.setTags(newTags);
    this.notesService.updateTagsInNotes(data);
  }

  private getTags(): Tag[] {
    const rawData = this.localStorageService.getItem(DataStorageKeys.TAG);

    if (rawData) {
      return JSON.parse(rawData);
    }
    return [];
  }
  private setTags(tags: Tag[]): void {
    this.localStorageService.setItem(DataStorageKeys.TAG, JSON.stringify(tags));
    this.currentTags$.next(tags);
  }

  getAllTags(): Observable<Tag[]> {
    return this.currentTags$.asObservable();
  }

  deleteTag(data: Tag) {
    const tags = this.getTags();
    const newTags = tags.filter((tag) => tag.id !== data.id);
    this.setTags(newTags);
    this.notesService.deleteTagsInNotes(data);
  }
}
