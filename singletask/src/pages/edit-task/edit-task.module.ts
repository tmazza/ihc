import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTask } from './edit-task';
import { Task } from '../../providers/task';

@NgModule({
  declarations: [
    EditTask,
  ],
  imports: [
    IonicPageModule.forChild(EditTask),
  ],
  providers: [Task],
})
export class EditTaskModule {}
