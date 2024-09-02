import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TagsService } from 'src/app/services/tags.service';
import { TagsColors } from 'src/app/shared/helpers/types';
import { Tag } from 'src/app/shared/interfaces/Tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent implements OnInit {
  @ViewChild('tagDiv') tagDiv: ElementRef<HTMLDialogElement>;

  @Input() tagData: Tag;
  @Input() clickable: boolean = true;
  @Input() editable: boolean = false;

  @Input() set isPicked(tags: Tag[]) {
    this.isTagPicked = !!tags.find((elem) => elem.id === this.tagData.id);
  }

  @Output() clicked = new EventEmitter<Tag>();

  constructor(private tagsService: TagsService) {}

  public color: TagsColors;
  public isTagPicked: boolean;

  ngOnInit(): void {
    this.color = this.tagData.color;
  }

  onClick() {
    if (!this.clickable) {
      return;
    }
    this.pickTag();
    this.clicked.emit(this.tagData);
  }

  pickTag() {
    if (!this.clickable) {
      return;
    }

    this.isTagPicked = !this.isTagPicked;
  }

  deleteTag(e: Event) {
    e.stopPropagation();
    this.tagsService.deleteTag(this.tagData);
  }
}
