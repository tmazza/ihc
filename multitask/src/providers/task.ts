import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable()
export class Task {

  private id: string; // Local storage ID

  constructor() {
    this.id = this.getTodayID();
  }

  getAll(id = null) {
    id = id ? id : this.id;
    let data = JSON.parse(localStorage.getItem(id));
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

  todayIsSet() {
    let ID = JSON.parse(localStorage.getItem('ID'+this.id));
    return ID !== null;
  }

  getLastId() {
    let ID = JSON.parse(localStorage.getItem('ID'+this.id));
    return ID === null ? 0 : ID;
  }

  getNextID() {
    let lastID = this.getLastId();
    localStorage.setItem('ID'+this.id, JSON.stringify(lastID+1));
    return lastID;
  }

  setID(id) {
    localStorage.setItem('ID'+this.id, JSON.stringify(id));
  }

  /// ID base

  getTodayID() {
    let today = DateTime.local().setZone('America/Sao_Paulo').plus({
      days: 1
    });
    return this.makeID(today);
  }

  getYesterdayID() {
    let yesterday = DateTime.local().setZone('America/Sao_Paulo').minus({
      days: 0,
    });
    return this.makeID(yesterday);
  }

  makeID(date) {
    let day = ("0" + date.day).slice(-2);
    let month = ("0" + date.month).slice(-2);
    let year = ("0" + date.year).slice(-4);
    return [day, month, year].join('-');
  }


}
