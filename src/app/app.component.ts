import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnInit {
  loading = false;
  constructor(
    public loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe(
      (loading) => {
        setTimeout(() => {
          this.loading = loading;
        }, 100);
      }
    );
  }
}
