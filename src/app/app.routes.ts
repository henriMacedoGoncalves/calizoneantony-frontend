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
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', component: IntroductionComponent },
  { path: 'aboutme', component: AboutMeComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  {
    path: 'ebooks',
    component: EbooksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ebooks/:id',
    component: EbookDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'onlinecoaching',
    component: OnlinecoachingComponent,
    canActivate: [AuthGuard],
  },
  { path: 'cart', component: CartDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'callback', component: IntroductionComponent },
];
