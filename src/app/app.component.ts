import { Component } from '@angular/core';
import { NotesService } from './services/notes.service';
import { Note } from './shared/interfaces/Note';
import { Tag } from './shared/interfaces/Tag';
import { TagsService } from './services/tags.service';
import { getRandomColor } from './shared/helpers/utils';
import { v4 } from 'uuid';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'test';
  isTagCreateOpen: boolean = false;
  isNoteCreateOpen: boolean = false;

  notes$: Observable<Note[]>;
  tags$: Observable<Tag[]>;

  constructor(
    private notesService: NotesService,
    private tagsService: TagsService
  ) {
    this.notes$ = notesService.getAllNotes();
    this.tags$ = tagsService.getAllTags();
  }

  openTagCreateModal() {
    this.isTagCreateOpen = true;
  }

  closeTagCreateModal() {
    this.isTagCreateOpen = false;
  }

  createTag(tag: Tag) {
    this.tagsService.createTag(tag);
    this.isTagCreateOpen = false;
  }

  closeNoteCreateModal() {
    this.isNoteCreateOpen = false;
  }

  createNote(note: Note) {
    this.notesService.createNote(note);
    this.isNoteCreateOpen = false;
  }

  openNoteCreateModal() {
    this.isNoteCreateOpen = true;
  }
}
