import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TagsService } from 'src/app/services/tags.service';
import { RemindDates } from 'src/app/shared/enums/cron.enums';
import { Note } from 'src/app/shared/interfaces/Note';
import { Tag } from 'src/app/shared/interfaces/Tag';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoteComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean;
  @Input() note: Note;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<Note>();

  tags$: Observable<Tag[]>;
  tagsForNote: Tag[] = [];

  remindDates = Object.values(RemindDates);

  public createNoteForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    remind: new FormControl(null),
    when: new FormControl(RemindDates.MINUTE, [Validators.required]),
  });

  constructor(private tagsService: TagsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.note) {
      const { title, description, tags, whenRemind } = this.note;
      this.createNoteForm.setValue({
        title,
        description,
        remind: !!whenRemind,
        when: whenRemind ? whenRemind : null,
      });
      this.tagsForNote = [...tags];
    }
    if (!this.note?.whenRemind) {
      this.createNoteForm.get('when')?.removeValidators(Validators.required);
      this.createNoteForm.get('when')?.updateValueAndValidity();
    }
  }
  ngOnInit(): void {
    this.tags$ = this.tagsService.getAllTags();
  }

  handleCancel() {
    this.isVisible = false;
    this.close.emit();
  }

  handleOk() {
    const note: Note = {
      title: this.createNoteForm.value.title,
      description: this.createNoteForm.value.description,
      tags: this.tagsForNote,
    };

    if (this.createNoteForm.value.remind) {
      note.whenRemind = this.createNoteForm.value.when;
    } else {
      note.whenRemind = null;
    }

    this.isVisible = false;
    this.createNoteForm.reset();
    this.tagsForNote = [];
    this.create.emit(note);
  }

  addOrDeleteTag(tag: Tag) {
    const tagInNote = !!this.tagsForNote.find((item) => item.id === tag.id);
    if (tagInNote) {
      this.tagsForNote = this.tagsForNote.filter((item) => item.id !== tag.id);
    } else {
      this.tagsForNote.push(tag);
    }
  }

  onCheckBoxChanged(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.checked) {
      this.createNoteForm.get('when')?.clearValidators();
      this.createNoteForm.get('when')?.updateValueAndValidity();
    } else {
      this.createNoteForm.get('when')?.addValidators(Validators.required);
      this.createNoteForm.get('when')?.updateValueAndValidity();
    }
  }
}
