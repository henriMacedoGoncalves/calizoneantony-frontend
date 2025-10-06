import { Routes } from '@angular/router';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { EbooksComponent } from './components/ebooks/ebooks.component';
import { CommunityComponent } from './components/community/community.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OnlinecoachingComponent } from './components/onlinecoaching/onlinecoaching.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { EbookDetailsComponent } from './components/ebook-details/ebook-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: IntroductionComponent },
  { path: 'aboutme', component: AboutMeComponent },
  { path: 'community', component: CommunityComponent },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'ebooks',
    component: EbooksComponent,
    canActivate: [authGuard],
  },
  {
    path: 'ebooks/:id',
    component: EbookDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'onlinecoaching',
    component: OnlinecoachingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: CartDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard],
  },
  { path: 'callback', component: IntroductionComponent },
];
