import { Component, OnInit } from '@angular/core';
import { NotesService } from './services/notes.service';
import { Note } from './shared/interfaces/Note';
import { Tag } from './shared/interfaces/Tag';
import { TagsService } from './services/tags.service';
import { getRandomColor } from './shared/helpers/utils';
import { v4 } from 'uuid';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ReminderService } from './services/reminder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'test';

  constructor(private reminderService: ReminderService) {}
  ngOnInit(): void {
    this.reminderService.restartIntervals();
  }
}
