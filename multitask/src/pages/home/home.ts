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

  constructor(public navCtrl: NavController, public taskProvider: Task,
              public alertCtrl: AlertController) {}

  ionViewWillEnter() {
    this.refresh();
  }

  refresh() {
    let notDone = (v) => { return !v.done; };
    this.tasks = this.taskProvider.getAll().filter(notDone);
  }

  goToAddTask() {
    this.navCtrl.push("AddTask");
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
            this.taskProvider.update(task);
            this.refresh();
          }
        }
      ]
    });
    confirm.present();
  }

  delete(task) {
        let confirm = this.alertCtrl.create({
      title: 'Excluir tarefa?',
      message: 'Confirma exclusão da tarefa <b>' + task.description + '</b>?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Sim, excluir',
          handler: () => {
            this.taskProvider.delete(task);
            this.refresh();;
          }
        }
      ]
    });
    confirm.present();
  }

}
