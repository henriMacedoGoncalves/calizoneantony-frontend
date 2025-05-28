import { Routes } from '@angular/router';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { EbooksComponent } from './components/ebooks/ebooks.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { CommunityComponent } from './components/community/community.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OnlinecoachingComponent } from './components/onlinecoaching/onlinecoaching.component';

export const routes: Routes = [
    {path:'', component: IntroductionComponent},
    {path:'aboutme', component: AboutmeComponent},
    {path:'community', component: CommunityComponent},
    {path:'login', component: LoginComponent},
    {path:'overview', component: OverviewComponent},
    {path:'ebooks', component: EbooksComponent},
    {path:'onlinecoaching', component: OnlinecoachingComponent},
    {path:'cart', component: CartComponent},
    {path:'profile', component: ProfileComponent}
];
