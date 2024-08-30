import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TAGS_COLORS } from 'src/app/shared/consts/tags';
import { TagsColors } from 'src/app/shared/helpers/types';
import { getRandomColor } from 'src/app/shared/helpers/utils';
import { Tag } from 'src/app/shared/interfaces/Tag';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.less'],
})
export class CreateTagComponent {
  @Input() isVisible: boolean;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<Tag>();

  private currentColor?: TagsColors;

  constructor() {}

  readonly colors: typeof TAGS_COLORS = TAGS_COLORS;

  public createTagForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  handleCancel() {
    this.isVisible = false;
    this.close.emit();
  }

  handleOk() {
    const tag: Tag = {
      title: this.createTagForm.value.title,
      color: this.currentColor || getRandomColor(),
    };
    this.create.emit(tag);
    this.isVisible = false;
  }

  changeCurrentColor(color: TagsColors) {
    this.currentColor = color;
  }
}
