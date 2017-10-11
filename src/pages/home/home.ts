import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {TimerComponent} from "../timer/timer";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit, OnInit{
  @ViewChild(TimerComponent) timer: TimerComponent;
  isPunchIn: boolean;
  resetSeconds: number;
  startTime: string;
  miniSeconds: number = 3600 * 9;
  hourDiff: number = 3600000 * 19;
  hasEndTime: boolean = false;
  endTime: string;
  constructor(public navCtrl: NavController, public storage: Storage) {
    const that = this;
    that.storage.get(that.getKey()).then((value)=> {
      if (value === null) {
        that.isPunchIn = true;
      } else {
        that.isPunchIn = false;
        const punchData = JSON.parse(value);
        const now = new Date();
        const startDate = new Date(punchData['in']);
        const resetSeconds = that.getMiniSeconds(startDate)- Number.parseInt(((now.getTime() - punchData['in']) / 1000).toString());
        that.startTime = that.getDateString(startDate);
        that.resetSeconds = resetSeconds > 0 ? resetSeconds: 0;
        that.timer.timeInSeconds = resetSeconds;
        that.timer.initTimer();
        that.timer.startTimer();
        if (punchData.hasOwnProperty('out')) {
          const endDate = new Date(punchData['out']);
          that.hasEndTime = true;
          that.endTime = that.getDateString(endDate);
        }
      }
    })
  }
  private getMiniSeconds(start: Date) {
    if (start.getHours() >= 10) {
      const end = new Date(Number.parseInt(this.getKey()) + this.hourDiff);
      return Number.parseInt(((end.getTime() - start.getTime()) / 1000).toString());
    }
    return this.miniSeconds;
  }
  ngOnInit() {
  }
  private getDateString(time: Date) {
    const YMD = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
    const HMS = [time.getHours(), time.getMinutes(), time.getSeconds()];
    return YMD.join('-') + " " + HMS.join(':');
  }
  ngAfterViewInit() {
  }

  private getKey() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today.getTime().toString();
  }
  public punchIn() {
    if (!this.isPunchIn) {
      return;
    }
    const now = new Date();
    const punchData = {
      'in': now.getTime()
    };
    const that = this;
    this.storage.set(this.getKey(), JSON.stringify(punchData)).then((value)=> {
      that.isPunchIn = false;
      that.resetSeconds = that.getMiniSeconds(now);
      that.startTime = that.getDateString(now);
    });
    setTimeout(()=> {
      that.timer.startTimer();
    }, 1000);
  }
  public punchOut() {
    if (!this.isPunchIn) {
      const key = this.getKey();
      const that = this;
      this.storage.get(key).then((value)=> {
        if (value !== null) {
          const punchData = JSON.parse(value);
          let now = new Date();
          punchData['out'] = now.getTime();
          that.hasEndTime = true;
          that.endTime = that.getDateString(now);
          that.storage.set(key, JSON.stringify(punchData));
        } else {
          that.isPunchIn = true;
        }
      })
    }
  }
}
