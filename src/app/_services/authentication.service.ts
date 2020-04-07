import { Injectable } from '@angular/core';
import { ajaxPost } from 'rxjs/internal/observable/dom/AjaxObservable';
import { ajax } from 'rxjs/ajax';

import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { User } from '../_domain/User';
import { GenericError } from '../_domain';

/**
 * The AuthenticationService handles all methods and checks related to logging in and registering.
 * TODO: Rewrite for VLLDS
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private storageService: StorageService
  ) { }

  public isAuthenticated(): boolean {
    const user: User = this.storageService.user.getValue();

    if (!user) {
      return false;
    }

    if (!user.token) {
      return false;
    }

    return true;
  }

  public async login(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/login`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password: password
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data) {
            resolve();
            // TODO: Add once getUsers works
            // this.getUser(data).then((user) => {
            //   user.token = data;
            //   this.storageService.user.next(user);
            //   resolve();
            // })
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not login due to a server error, please contact support if the issue persists.'
            }));
          }
        })
        .catch((error) => {
          // Check for internet connection
          if (!navigator.onLine) {
            reject(new GenericError({
              name: 'NoNetworkError',
              message: 'There is no network connection right now. Check your internet connection and try again.'
            }));
            return;
          }

          console.log(error);
          reject(error);
        });
    });
  }

  public async register(username: string, displayName: string, bio: string, affiliation: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ajaxPost(`${environment.api_url}/user/register`, {username, displayName, bio, affiliation, password}, {
        'Content-Type': 'application/json'
      }).subscribe({
        error: error => {
          reject();
        },
        next: data => {
          resolve();
        }
      })
    });
  }

  public async logout(): Promise<void> {
    return this.storageService.user.clear();
  }

  private async getUser(token: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const url = new URL(`${environment.api_url}/identity/getUser`);
      url.searchParams.append('token', token);
      ajax({
        url: url.toString(),
        withCredentials: false,
        crossDomain: true,
        method: 'GET'
      }).subscribe({
        error: (error) => {
          reject();
        },
        next: data => {
          // TODO: Implement getUser once the API has this functionality
          const user = new User({
            id: data.response.id,
          });

          resolve(user);
        }
      })
    });
  };
}
