import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';
import { TagsService } from 'src/app/services/tags.service';
import { Note } from 'src/app/shared/interfaces/Note';
import { Tag } from 'src/app/shared/interfaces/Tag';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.less'],
})
export class NotesComponent {
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
