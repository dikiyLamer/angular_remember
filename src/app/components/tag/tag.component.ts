import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TAGS_COLORS } from 'src/app/shared/consts/tags';
import { TagsColors } from 'src/app/shared/helpers/types';
import { Tag } from 'src/app/shared/interfaces/Tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent implements OnInit {
  @Input() tagData: Tag;
  @Input() clickable: boolean = true;
  @Input() set isPicked(tags: Tag[]) {
    this.isTagPicked = !!tags.find((elem) => elem.id === this.tagData.id);
  }
  @Output() clicked = new EventEmitter<Tag>();

  constructor(private cdr: ChangeDetectorRef) {}
  public color: TagsColors;
  public isTagPicked: boolean;

  ngOnInit(): void {
    this.color = this.tagData.color;
  }

  @HostListener('pointerup')
  onClick() {
    if (!this.clickable) {
      return;
    }
    this.clicked.emit(this.tagData);
  }
}
