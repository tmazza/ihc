import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Task } from '../../providers/task';
import { DateTime } from 'luxon';
import { trigger, state, style, animate, transition } from '@angular/animations';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('addButton', [
      state('inactive', style({ transform: 'rotate(0deg)', })),
      state('active', style({ transform: 'rotate(225deg)', fontSize: '2.2em', })),
      transition('inactive => active', animate('400ms ease-out')),
      transition('active => inactive', animate('400ms ease-out'))
    ]),
    trigger('openCalendar', [
      state('click', style({
        background: 'red',
        transform: 'translateX(90vw)'
      })),
      transition('* => click', animate("1000ms ease-out")),
    ]),
  ],
})
export class HomePage {

  public button_state: string = 'inactive';
  public open_calendar: string = '';

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

    this.check_yesterday();

    let today = DateTime.local().setZone('America/Sao_Paulo');
    this.day = ("0" + today.day).slice(-2);
    this.month = ("0" + today.month).slice(-2);
    this.refresh();
  }

  check_yesterday() {
    if(!this.taskProvider.todayIsSet()) {
      let yesterday_tasks = this.taskProvider.getAll(this.taskProvider.getYesterdayID());

      let tasks_not_done = [];
      for(let t of yesterday_tasks) {
        if(!t.done) {
          tasks_not_done.push(t);
        }
      }
      if(tasks_not_done.length > 0) {
        let confirm = this.alertCtrl.create({
          title: 'Importar tarefas não finalizadas ontem?',
          message: '"' + tasks_not_done.map(t=>t.description).join('", "') + '"',
          buttons: [
            {
              text: 'Não',
              handler: () => {
                this.taskProvider.setID(0);
              }
            },
            {
              text: 'Sim, importar',
              handler: () => {
                for(let t of tasks_not_done) {
                  this.taskProvider.add(t);
                }
                this.refresh();
              }
            }
          ]
        });
        confirm.present();
      }
    }
  }
 
  refresh() {
    this.tasks = this.taskProvider.getAll();
  }

  goToAddTask() {
    this.navCtrl.push("AddTask");
  }

  toggleDone(task) {
    task.done = !task.done;
    this.taskProvider.update(task);
    this.refresh();
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
    this.button_state = this.show_add_task ? 'active' : 'inactive';
  }

}
