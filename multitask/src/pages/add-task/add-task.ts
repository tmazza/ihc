import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Task } from '../../providers/task';

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTask {

  task: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public taskProvider: Task) {
    this.task = {
      description: null,
      done: false,
    }
  }

  submit() {
    this.taskProvider.add(this.task);
    this.navCtrl.pop();
  }

}
