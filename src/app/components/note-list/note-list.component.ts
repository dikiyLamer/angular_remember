import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from 'src/app/shared/interfaces/Note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListComponent {
  @Input() notes: Note[] | null;
}
