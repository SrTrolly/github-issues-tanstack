import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideZoneChangeDetection(), provideAngularQuery(new QueryClient()), provideMarkdown()]
};
