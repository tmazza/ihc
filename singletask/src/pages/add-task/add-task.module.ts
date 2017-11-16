import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTask } from './add-task';
import { Task } from '../../providers/task';

@NgModule({
  declarations: [
    AddTask,
  ],
  imports: [
    IonicPageModule.forChild(AddTask),
  ],
  providers: [Task]
})
export class AddTaskModule {}
