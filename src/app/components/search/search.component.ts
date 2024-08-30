import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { SearchService } from 'src/app/services/search.service';
import { SearchParams } from 'src/app/shared/helpers/types';
import { Tag } from 'src/app/shared/interfaces/Tag';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent implements OnInit {
  public popoverVisible: boolean = false;
  public pickedTags: Tag[] = [];
  public tagSearchActive: boolean;
  private searchValue: string = '';

  constructor(
    private notesService: NotesService,
    private searchService: SearchService
  ) {}

  searchForm: FormGroup = new FormGroup({
    title: new FormControl([]),
  });

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe((val: SearchParams) => {
      this.searchValue = val.title;
      this.notesService.filterData(this.searchValue, this.pickedTags);
    });
    this.searchService.getSearchTags().subscribe((tags) => {
      this.pickedTags = tags;
      this.tagSearchActive = tags.length ? false : true;
    });
  }

  openPopover() {
    this.popoverVisible = true;
  }

  closePopover() {
    this.popoverVisible = false;
  }

  tagsChanged(tags: Tag[]) {
    this.pickedTags = tags;
    this.notesService.filterData(this.searchValue, this.pickedTags);
    this.searchService.updateTags(tags);
  }
}
