import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Task } from '../../providers/task';
import { DateTime } from 'luxon';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tasks: any;
  public day: string;
  public month: string;

  public show_add_task: boolean = false;
  public new_task: any = {
    description: null,
    done: false,
  };

  constructor(public navCtrl: NavController, public taskProvider: Task,
              public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
    let today = DateTime.local().setZone('America/Sao_Paulo');
    this.day = ("0" + today.day).slice(-2);
    this.month = ("0" + today.month).slice(-2);
    this.refresh();
  }
 
  refresh() {
    // let notDone = (v) => { return !v.done; };
    this.tasks = this.taskProvider.getAll();//.filter(notDone);
  }

  goToAddTask() {
    this.navCtrl.push("AddTask");
  }

  toggleDone(task) {
    task.done = !task.done;
    this.taskProvider.update(task);
    this.refresh();
    // -- Confirmação de ação
    // let actionSheet = this.actionSheetCtrl.create({
    //   title: (task.done ? 'Redo' : 'Done') + ' "' + task.description + '"?' ,
    //   buttons: [
    //     { text: 'Yes, ' + (task.done ? 'lets redo' : 'its done'),
    //       handler: () => {
    //         task.done = !task.done;
    //         this.taskProvider.update(task);
    //         this.refresh();
    //       }
    //     }, {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: () => {}
    //     }
    //   ]
    // });
    // actionSheet.present();
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

  add_task() {
    this.taskProvider.add(this.new_task);
    this.new_task = {
      description: null,
      done: false,
    }
    this.refresh();
    this.toggleAddTask();
  }
  
  toggleAddTask() {
    this.show_add_task = !this.show_add_task;
  }

}
