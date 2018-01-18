import {Component, OnInit} from '@angular/core';
import {GithubService} from '../service/github.service';
import {AppDB} from '../model/app.db.model';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-about',
    templateUrl: './app-about.component.html',
    styleUrls: ['./app-about.component.css']
})
export class AppAboutComponent implements OnInit {

    constructor(private githubService: GithubService) {
    }

    appDB: Observable<AppDB> = this.githubService.getAppDB();

    ngOnInit() {
    }

}
