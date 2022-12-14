import { LocalUser } from '../models/localuser';
import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage.config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: LocalUser) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }
}
