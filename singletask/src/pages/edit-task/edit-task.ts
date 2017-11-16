import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular'; 
import { Task } from '../../providers/task';

@IonicPage()
@Component({
  selector: 'page-edit-task',
  templateUrl: 'edit-task.html',
})
export class EditTask {

  tasks: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public taskProvider: Task, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.refresh();
  }
  
  refresh() {
    this.tasks = this.taskProvider.getAll();

    // TODO: rever!!
    let fnSort = (a, b) => {
      if(a.done && b.done) {
        return 0;
      } else if(a.done) {
        return a._id < b._id;
      } else {
        return -1;
      }
    }

    this.tasks.sort(fnSort);
  }

  reorderItems(indexes) {
    let element = this.tasks[indexes.from];
    this.tasks.splice(indexes.from, 1);
    this.tasks.splice(indexes.to, 0, element);
  }

  applyChanges() {
    this.taskProvider.setAll(this.tasks);
    this.navCtrl.pop();
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
            this.refresh();
          }
        }
      ]
    });
    confirm.present();
  }


}
