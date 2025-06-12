import { Routes } from '@angular/router';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { EbooksComponent } from './components/ebooks/ebooks.component';
import { CommunityComponent } from './components/community/community.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OnlinecoachingComponent } from './components/onlinecoaching/onlinecoaching.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { EbookDetailsComponent } from './components/ebook-details/ebook-details.component';

export const routes: Routes = [
  { path: '', component: IntroductionComponent },
  { path: 'aboutme', component: AboutMeComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'login', component: LoginComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'ebooks', component: EbooksComponent },
  { path: 'ebooks/:id', component: EbookDetailsComponent },
  { path: 'onlinecoaching', component: OnlinecoachingComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
];
