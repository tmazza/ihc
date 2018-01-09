import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Task } from '../../providers/task';
import { CustomStorage } from '../../providers/custom-storage';
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
      state('open', style({ opacity: 0.7, fontSize: '0.8em', })),
      transition('* <=> open', animate("500ms")),
    ]),
    trigger('openCalendar2', [
      state('open', style({ opacity: 0.6, fontSize: '0.5em', })),
      transition('* => open', animate("1000ms")),
      transition('open => *', animate("200ms")),
    ]),
  ],
})
export class HomePage {
   @ViewChild('addInput') addInput;

  public button_state: string = 'inactive';
  public open_calendar: string = '';

  public today: any;
  public today_id: any;
  public real_today: any;
  public tasks: any;
  public day: string;
  public month: string;

  public days = {
    twoDaysAgo: '',
    yesterday: '',
    today: '',
    tomorrow: '',
    twoDaysFromNow: '',
  };

  public show_add_task: boolean = false;
  public new_task: any = {
    description: null,
    done: false,
  };

  constructor(public navCtrl: NavController, public taskProvider: Task,
              public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,
              public storage: CustomStorage) {
    this.today = DateTime.local().setZone('America/Sao_Paulo');
    this.real_today = this.getLabelDay(this.today);
    this.check_yesterday();
    this.setCurrentDayData();
    this.refresh();
  }

  check_yesterday() {
    let import_id = 'import-'+this.real_today;
    this.storage.get(import_id).then((data) => {
      if(data === null) {
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
                  this.storage.set(import_id, 1);
                }
              },
              {
                text: 'Sim, importar',
                handler: () => {
                  for(let t of tasks_not_done) {
                    this.taskProvider.add(t);
                  }
                  this.refresh();
                  this.storage.set(import_id, 1);
                }
              }
            ]
          });
          confirm.present();
        }
      }    
    });
  }
 
  refresh() {
    this.tasks = this.taskProvider.getAll(this.today_id);
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
    setTimeout(()=>{ this.addInput.setFocus(); }, 100)
  }

  updateDay(day_count = false) {
    if(this.open_calendar === 'open') {
      let day = this.today;
      if(day_count) day = day.plus({days:day_count})
      this.today = day;
      this.setCurrentDayData();
      this.refresh();
    }
  }

  setCurrentDayData() {
    this.today_id = this.taskProvider.makeID(this.today);
    this.days.today = this.getLabelDay(this.today);
    this.days.twoDaysAgo = this.getLabelDay(this.today.minus({days:2}));
    this.days.yesterday = this.getLabelDay(this.today.minus({days:1}));
    this.days.tomorrow = this.getLabelDay(this.today.plus({days:1}));
    this.days.twoDaysFromNow = this.getLabelDay(this.today.plus({days:2}));
    this.taskProvider.setDayID(this.today_id);
  }

  getLabelDay(day) {
    return ("0" + day.day).slice(-2) + '/' + ("0" + day.month).slice(-2);
  }


}
