import { Component, Input } from '@angular/core';
import { Remind } from 'src/app/shared/interfaces/Remind';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.less'],
})
export class RemindersListComponent {
  @Input() reminds: Remind[] | null;
}
