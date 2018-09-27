
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListeHiraComponent} from './liste-hira/liste-hira.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HiraHadikaComponent} from './hira-hadika/hira-hadika.component';


// import {HeroDetailComponent} from './hero-detail/hero-detail.component';
// import {HeroListComponent} from './hero-list/hero-list.component';

const appRoutes: Routes = [
    // {path: 'crisis-center', component: CrisisCenterComponent},
    {path: 'hira/:id', component: HiraHadikaComponent},
    // {path: 'heroes', component: HeroListComponent, data: {title: 'Heroes List'}},
    {path: '', component: ListeHiraComponent},
    // {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
