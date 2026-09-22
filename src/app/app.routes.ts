import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  // Početna se učitava odmah (najvažnija stranica, LCP)
  { path: '', component: HomePage, pathMatch: 'full' },
  // Podstranice se učitavaju lijeno (lazy loading)
  {
    path: 'usluge/:slug',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.page').then((m) => m.ServiceDetailPage),
  },
  { path: 'usluge', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'o-nama',
    loadComponent: () => import('./pages/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'pravila-privatnosti',
    loadComponent: () => import('./pages/legal/privacy.page').then((m) => m.PrivacyPage),
  },
  {
    path: 'kolacici',
    loadComponent: () => import('./pages/legal/cookies.page').then((m) => m.CookiesPage),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
