import { Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { EbooksComponent } from './components/ebooks/ebooks.component';

export const routes: Routes = [
    {path:'', component: IntroductionComponent},
    {path:'aboutme', component: AboutMeComponent},
    {path:'ebooks', component: EbooksComponent}
];
