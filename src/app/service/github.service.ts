import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {UserRepo} from '../model/user-repo.model';

const GITHUB_API_URL = 'https://api.github.com';
const REPO_EXCLUSIONS = ['tahsinozden.github.io'];

@Injectable()
export class GithubService {
    constructor(private httpClient: HttpClient) {
    }

    getReposByUserName(userName: string) {
        return this.httpClient.get(GITHUB_API_URL + '/users/' + userName + '/repos')
            .map((data: object[]) => this.filterAndSortData(data));
    }

    getRepoReadmeByUser(userName: string, repoName: string) {
        return this.httpClient.get(GITHUB_API_URL + '/repos/' + userName + '/' + repoName + '/contents/README.md')
            .map(data => {
                return atob(data['content']);
            });
    }

    private filterAndSortData(data: object[]) {
        return data
            .filter(function (item) {
                return !(item['fork'] || REPO_EXCLUSIONS.indexOf(item['name'] ) > -1);
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
    }

    getFormattedReadMe(readMe: string) {
        return readMe.replace('##', '<strong>')
                     .replace('#', '<strong>')
                     .replace('\n', '</strong>\n');
    }
}
