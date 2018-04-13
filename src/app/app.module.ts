import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import {AppComponent} from './app.component';
import {AppHomeComponent} from './app-home/app-home.component';
import {GithubService} from './service/github.service';
import {AppAboutComponent} from './app-about/app-about.component';


const appRoutes: Routes = [
    {path: '', component: AppHomeComponent},
    {path: 'about', component: AppAboutComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        AppHomeComponent,
        AppAboutComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(
            appRoutes,
        ),
        MarkdownModule.forRoot(),
    ],
    providers: [GithubService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
