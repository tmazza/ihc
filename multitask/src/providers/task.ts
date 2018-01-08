import { Injectable } from '@angular/core';

@Injectable()
export class Task {

  id: string; // Local storage ID

  constructor() {
    this.id = 'TODO-task';
  }
 
  getAll() {
    let data = JSON.parse(localStorage.getItem(this.id));
    return data == null ? [] : data;
  }

  add(data) {
    data._id = this.getNextID();
    var all = this.getAll();
    all.push(data);
    localStorage.setItem(this.id, JSON.stringify(all));
  }

  update(data) {
    var all = this.getAll();
    if(all !== null) {
      let findById = (elm, idx, arr) => {
        return elm._id == data._id;
      };
      let index = all.findIndex(findById);
      if(all[index] !== undefined) {
        all[index] = data;
        localStorage.setItem(this.id, JSON.stringify(all));
      }
    }
  }

  delete(data) {
    var all = this.getAll();
    if(all !== null) {
      let findById = (elm, idx, arr) => {
        return elm._id == data._id;
      };
      let index = all.findIndex(findById);
      all.splice(index, 1);
      localStorage.setItem(this.id, JSON.stringify(all));
    }
  }

  getLastId() {
    let ID = JSON.parse(localStorage.getItem('ID'+this.id));
    return ID == null ? 0 : ID;
  }

  getNextID() {
    let lastID = this.getLastId();
    localStorage.setItem('ID'+this.id, JSON.stringify(lastID+1));
    return lastID;
  }


}
