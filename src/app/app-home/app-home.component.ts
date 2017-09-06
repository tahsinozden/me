import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserRepo} from '../model/user-repo.model';
import {GithubService} from '../service/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {

  userRepos: Observable<UserRepo[]> = this.githubService.getReposByUserName('tahsinozden');

  constructor(private githubService: GithubService) {
  }

  ngOnInit() {
  }

}
