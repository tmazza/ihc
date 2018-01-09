import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { Task } from '../../providers/task';
import { CustomStorage } from '../../providers/custom-storage';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [HomePage],
  imports: [
    IonicPageModule.forChild(HomePage), 
    IonicStorageModule.forRoot()],
  providers: [Task, CustomStorage],
})
export class HomePageModule { }