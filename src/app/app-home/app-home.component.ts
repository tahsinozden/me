import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserRepo} from '../model/user-repo.model';
import {GithubService} from '../service/github.service';

const USER_NAME = 'tahsinozden';

@Component({
    selector: 'app-home',
    templateUrl: './app-home.component.html',
    styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {

    userRepos: Observable<UserRepo[]> = this.githubService.getReposByUserName(USER_NAME);
    readMeContent = '';
    readMeLoaded = false;

    constructor(private githubService: GithubService) {
    }

    onClickRepoName(repoName: string) {
        this.readMeLoaded = false;
        this.githubService.getRepoReadmeByUser(USER_NAME, repoName)
            .subscribe(
                (data: string) => {
                    this.readMeContent = data;
                    this.readMeLoaded = true;
                    console.log(this.githubService.getFormattedReadMe(data));
                },
                error => {
                    this.readMeContent = 'No README file found!';
                    this.readMeLoaded = true;
                }
            );
    }

    shortenUrl(fullUrl: string) {
        return fullUrl.slice(('https://github.com/').length);
    }

    ngOnInit() {
    }

}
