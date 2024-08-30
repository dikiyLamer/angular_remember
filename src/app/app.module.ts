import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';
import { TagComponent } from './components/tag/tag.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTagComponent } from './components/popups/create-tag/create-tag.component';
import { CreateNoteComponent } from './components/popups/create-note/create-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzComposedModule } from './shared/modules/nz.module';
import { NoteListComponent } from './components/note-list/note-list.component';
import { ChangeColorDirective } from './shared/directives/change-color.directive';
import { IsTagPickedDirective } from './shared/directives/is-tag-picked.directive';
import { SearchComponent } from './components/search/search.component';
import { TagListComponent } from './components/tag-list/tag-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    TagComponent,
    CreateTagComponent,
    CreateNoteComponent,
    NoteListComponent,
    ChangeColorDirective,
    IsTagPickedDirective,
    SearchComponent,
    TagListComponent,
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
