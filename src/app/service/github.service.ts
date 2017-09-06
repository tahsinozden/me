import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {UserRepo} from '../model/user-repo.model';

const GITHUB_API_URL = 'https://api.github.com';

@Injectable()
export class GithubService {
  // https://api.github.com/users/tahsinozden/repos?q=type:=ownner
  constructor(private httpClient: HttpClient) {
  }

  getReposByUserName(userName: string) {
    return this.httpClient.get(GITHUB_API_URL + '/users/' + userName + '/repos')
      .map((data: object[]) => {
        return data
          .filter(function(item) {
              return item['fork'] === false;
          })
          .sort(function (a, b) {
              const d1 = new Date(a['updated_at']);
              const d2 = new Date(b['updated_at']);
              return d2.getTime() - d1.getTime();
          })
          .map(function (item) {
              return new UserRepo(item['id'], item['name'], item['full_name'],
                item['owner'], item['language'], item['updated_at'],
                item['html_url'], item['description'], item['fork']);
        });
      });
  }
}
