import { Component, OnInit } from '@angular/core';
import { Metadata, MongoUser} from '../../_domain';
import { MongodbService } from '../../_services';
import * as moment from 'moment';

declare function mpOverlay(baseMapId, overlayContId, Base, zoomLev, lat, lon);

@Component({
  selector: 'app-vis-component',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.scss']
})
export class VisComponent implements OnInit {

  constructor(private newService: MongodbService) { }

  public mpNum: Metadata;
  public mp1Num: Metadata;
  public mp2Num: Metadata;
  public mp3Num: Metadata;
  public mp4Num: Metadata;
  public dateTimePosted: string;
  public contributor: MongoUser;

  public getContributor(): void {
    this.newService.GetUserById(this.mpNum.contributor.toString()).then( data => {
      this.contributor = data as MongoUser;
    });
  }

  private splitDataArrayToObjects(data: Array<Metadata>): void {
    console.log(data.length);
    for (let i = 0, len = data.length; i < len; i++) {
      console.log(data[i].file);
      switch (data[i].file) {
        case 'mp1': {
          console.log('set mp1Num');
          this.mp1Num = data[i];
          break; }
        case 'mp2': {
          console.log('set mp2Num');
          this.mp2Num = data[i];
          break; }
        case 'mp3': {
          console.log('set mp3Num');
          this.mp3Num = data[i];
          break; }
        case 'mp4': {
          console.log('set mp4Num');
          this.mp4Num = data[i];
          break; }
        default: {
          break; }
      }
    }
  }

  private setOverlayContent(): void {
    switch (this.mpNum.id) {
      case this.mp1Num.id: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.mpOverlay('mp1', 'mp1OverlayCont', 'Gray', 12, 51.445, 5.450);
        break;
      }
      case this.mp2Num.id: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.mpOverlay('mp2', 'mp2OverlayCont', 'DarkGray', 12, 51.445, 5.450);
        break;
      }
      case this.mp3Num.id: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.mpOverlay('mp3', 'mp3OverlayCont', 'Gray', 12, 51.445, 5.450);
        break; }
      case this.mp4Num.id: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.mpOverlay('mp4', 'mp4OverlayCont', 'Gray', 12, 51.445, 5.450);
        break; }
      default: {
        break; }
    }
  }
  private processData(data: Array<Metadata>): void {
    this.splitDataArrayToObjects(data);
    this.setOverlayContent();
  }

  ngOnInit(): void {
    this.mpNum = JSON.parse(localStorage.getItem('visData'));
    this.dateTimePosted = moment(this.mpNum.created).format('ll');
    this.newService.GetMetadataVis().then(data => {
      console.log(data);
      this.processData(data as Metadata[]);
    });
    this.getContributor();
  }
}