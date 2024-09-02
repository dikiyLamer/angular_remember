import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes/notes.component';
import { ReminderComponent } from './components/reminds/reminder/reminder.component';

const routes: Routes = [
  { component: NotesComponent, path: 'notes' },
  { component: ReminderComponent, path: 'remind' },
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: '**', redirectTo: 'notes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
