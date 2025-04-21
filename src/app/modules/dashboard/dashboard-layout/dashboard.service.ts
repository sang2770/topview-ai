import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  title$ = new BehaviorSubject<string | null>(null);
  set title(title: string) {
    this.title$.next(title);
  }

  get title(): Observable<string | null> {
    return this.title$.asObservable();
  }

  constructor() {}
}
