import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  public show(): void {
    this.isLoadingSubject.next(true);
  }

  public hide(): void {
    this.isLoadingSubject.next(false);
  }
}
