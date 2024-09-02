import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/shared/interfaces/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {
  @Input() note: Note;

  isNoteUpdateOpen: boolean = false;

  constructor(private notesService: NotesService) {}

  deleteNote() {
    this.notesService.deleteNote(this.note);
  }
  count = { count: 0 };

  closeNoteUpdateModal() {
    this.isNoteUpdateOpen = false;
  }

  updateNote(note: Note) {
    this.notesService.updateNote({ ...this.note, ...note });
  }

  openUpdateNoteModal() {
    this.isNoteUpdateOpen = true;
  }
}
