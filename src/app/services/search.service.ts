import { Injectable } from '@angular/core';
import { Tag } from '../shared/interfaces/Tag';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private pickedSearchTags$ = new BehaviorSubject<Tag[]>([]);

  updateTags(tags: Tag[]) {
    this.pickedSearchTags$.next(tags);
  }

  getSearchTags(): Observable<Tag[]> {
    return this.pickedSearchTags$.asObservable();
  }
}
