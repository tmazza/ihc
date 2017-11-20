import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Task } from '../../providers/task';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: any;
  currentTask: any;

  constructor(public navCtrl: NavController, public taskProvider: Task,
              public alertCtrl: AlertController) {}

  ionViewWillEnter() {
    this.refresh();
  }

  refresh() {
    let notDone = (v) => { return !v.done; };
    this.tasks = this.taskProvider.getAll().filter(notDone);
    this.currentTask = this.tasks[0];
  }

  goToAddTask() {
    this.navCtrl.push("AddTask");
  }

  goToEditTask() {
    this.navCtrl.push("EditTask");
  }

  setDone(task) {
    let confirm = this.alertCtrl.create({
      title: 'Tarefa realizada?',
      message: 'Confirma realização da tarefa <b>' + task.description + '</b>?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Confirmar',
          handler: () => {
            task.done = true;
            this.taskProvider.delete(task);
            // this.taskProvider.update(task);
            this.refresh();
          }
        }
      ]
    });
    confirm.present();
  }

}
