import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TagsService } from 'src/app/services/tags.service';
import { Note } from 'src/app/shared/interfaces/Note';
import { Tag } from 'src/app/shared/interfaces/Tag';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.less'],
})
export class CreateNoteComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() note: Note;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<Note>();

  tags$: Observable<Tag[]>;
  tagsForNote: Tag[] = [];

  public createNoteForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(private tagsService: TagsService) {}
  ngOnInit(): void {
    this.tags$ = this.tagsService.getAllTags();
    if (this.note) {
      const { title, description, tags } = this.note;
      this.createNoteForm.setValue({ title, description });
      this.tagsForNote = [...tags];
    }
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
}
