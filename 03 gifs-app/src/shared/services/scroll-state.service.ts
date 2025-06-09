import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollstateService {
  trendingScrollState = signal(0);
}
