import { Injectable, } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class CustomStorage {

  public constructor(public storage: Storage) {}

  public set(key, data) {
    this.storage.set(key, JSON.stringify(data));
  }

  public get(key) {
    return new Promise((resolve, reject) => {
      this.storage.get(key).then(
        data => {
          if(data == null) {
            resolve(null)
          } else {
            resolve(JSON.parse(data));
          }
        },
        err =>  {
          resolve(null);
        });
    });
  }

}
