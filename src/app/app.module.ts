import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './components/notes/note/note.component';
import { TagComponent } from './components/tags/tag/tag.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTagComponent } from './components/popups/create-tag/create-tag.component';
import { CreateNoteComponent } from './components/popups/create-note/create-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzComposedModule } from './shared/modules/nz.module';
import { NoteListComponent } from './components/notes/note-list/note-list.component';
import { ChangeColorDirective } from './shared/directives/change-color.directive';
import { SearchComponent } from './components/search/search.component';
import { TagListComponent } from './components/tags/tag-list/tag-list.component';
import { NotesComponent } from './components/notes/notes/notes.component';
import { ReminderComponent } from './components/reminds/reminder/reminder.component';
import { RemindersListComponent } from './components/reminds/reminders-list/reminders-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    TagComponent,
    CreateTagComponent,
    CreateNoteComponent,
    NoteListComponent,
    ChangeColorDirective,
    SearchComponent,
    TagListComponent,
    NotesComponent,
    ReminderComponent,
    RemindersListComponent,
    NoteListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzComposedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
