import { Injectable } from '@angular/core';
import { Note } from '../shared/interfaces/Note';
import { LocalStorageService } from './local-storage.service';
import { DataStorageKeys } from '../shared/enums/data.enums';
import { Tag } from '../shared/interfaces/Tag';
import { BehaviorSubject } from 'rxjs';
import { v4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private currentNotes$ = new BehaviorSubject<Note[]>(this.getNotes());
  constructor(private localStorageService: LocalStorageService) {}

  createNote(data: Note) {
    data.id = v4();
    const notes = this.getNotes();
    const newNotes = [...notes, data];
    this.setNotes(newNotes);
  }

  updateNote(data: Note) {
    const notes = this.getNotes();
    const newNotes = notes.map((note) => {
      if (note.id === data.id) {
        return data;
      }
      return note;
    });
    this.setNotes(newNotes);
  }

  addTag(note: Note, tag: Tag) {
    note.tags.push(tag);
    this.updateNote(note);
  }

  public getAllNotes() {
    return this.currentNotes$.asObservable();
  }

  public filterData(title: string, tags: Tag[]) {
    const notes = this.getNotes();
    const filteredNotes = notes.filter((elem) => {
      const lowAndTrimNoteTitle = elem.title.toLowerCase().trim();
      const lowAndTrimSearchTitle = title.toLowerCase().trim();
      if (!lowAndTrimNoteTitle.includes(lowAndTrimSearchTitle)) {
        return false;
      }
      if (!tags.length) {
        return true;
      }
      if (
        tags.every(
          (item) => !!elem.tags.find((notetag) => notetag.id === item.id)
        )
      ) {
        return true;
      }

      return false;
    });
    this.currentNotes$.next(filteredNotes);
  }

  deleteNote(data: Note) {
    const notes = this.getNotes();
    const newNotes = notes.filter((note) => note.id !== data.id);
    this.setNotes(newNotes);
  }

  private getNotes(): Note[] {
    const rawData = this.localStorageService.getItem(DataStorageKeys.NOTE);

    if (rawData) {
      return JSON.parse(rawData);
    }
    return [];
  }
  private setNotes(notes: Note[]): void {
    this.localStorageService.setItem(
      DataStorageKeys.NOTE,
      JSON.stringify(notes)
    );
    this.currentNotes$.next(notes);
  }
}
