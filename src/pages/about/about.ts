import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  miniDateDiff: number = 42;
  punchLog: Array<object> = [];
  constructor(public navCtrl: NavController, public storage: Storage) {
    const that = this;
    storage.ready().then(() => {
      const now: any = new Date();
      storage.forEach((value, key, index) => {
        try{
          const logDate: any = new Date(key);
          if ((now - logDate) > 42 * 24 * 3600 * 1000) {
            storage.remove(key);
          } else {
            const punchData = JSON.parse(value);
            const log = {
              'date': that.getDate(new Date(punchData['in'])),
              'start': that.getTime(new Date(punchData['in'])),
              'end': that.getTime(new Date(punchData['out']))
            };
            that.punchLog.push(log);
          }
        } catch (e){
          console.log(e);
        }
      });
    });
  }
  private getDate(time: Date) {
    if (time === null) {
      return '-';
    }
    const YMD = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
    return YMD.join('-');
  }
  private getTime(time: Date) {
    if (time === null) {
      return '-'
    }
    const HMS = [time.getHours(), time.getMinutes(), time.getSeconds()];
    return HMS.join(':');
  }
}
