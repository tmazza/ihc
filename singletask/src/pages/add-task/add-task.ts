import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Task } from '../../providers/task';

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTask {

  task: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public taskProvider: Task, public toastCtrl: ToastController) {
    this.task = {
      description: null,
      done: false,
    }
  }

  submit() {
    this.taskProvider.add(this.task);

    let toast = this.toastCtrl.create({
      message: 'Tarefa adicionada.',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Ok",
    });
    toast.present();

    this.navCtrl.pop();
  }

}
