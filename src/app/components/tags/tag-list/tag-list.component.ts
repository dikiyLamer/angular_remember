import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from 'src/app/shared/interfaces/Tag';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent {
  @Output() tagClicked = new EventEmitter<Tag[]>();
  @Input() set pickedTags(tags: Tag[]) {
    this.tags = tags;
  }
  @Output() pickedTagsChange = new EventEmitter<Tag[]>();

  public tags$: Observable<Tag[]>;
  public tags: Tag[];

  constructor(private tagsService: TagsService) {
    this.tags$ = tagsService.getAllTags();
  }

  onTagClicked(tag: Tag) {
    const tagIsPicked = this.tags.find((elem) => elem.id === tag.id);

    if (tagIsPicked) {
      this.tags = this.tags.filter((elem) => elem.id !== tag.id);
    } else {
      this.tags = [...this.tags, tag];
    }
    this.tagClicked.emit(this.tags);
    this.pickedTagsChange.emit(this.tags);
  }
}
