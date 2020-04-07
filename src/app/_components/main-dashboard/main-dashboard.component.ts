import { Component, OnInit } from '@angular/core';
import {Metadata} from '../../_domain/metadata';
import {MongodbService} from '../../_services/mongodb.service';
import {Meta} from '@angular/platform-browser';

declare function mp1(zoomLev, lat, lon);
declare function mp2(zoomLev, lat, lon);
declare function mp3(zoomLev, lat, lon);
declare function mp4(zoomLev, lat, lon);
declare function ln1();


@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: [
    './main-dashboard.component.scss',
  ]
})
export class MainDashboardComponent implements OnInit {

  constructor(private newService: MongodbService, ) { }

  public showData: Array<Metadata>;
  public allData: Array<Metadata>;

  public filterInputString: string;
  public filterCategoryString = '';
  public filterTypeString = '';
  public filterAgeGroupString = '';

  private loadMaps() {
    mp1(11, 51.46, 5.450);
    mp2(11, 51.46, 5.450);
    mp3(11, 51.46, 5.450);
    mp4(11, 51.46, 5.450);
    // mp5(11, 51.46, 5.450);
    ln1();
  }

  ngOnInit(): void {
    this.newService.GetMetadata().then(data => {this.allData = data; this.showData = data;} );
  }

  public saveObjForVisualizationPage(id: string) {
    const obj = this.allData.find(x => x.id === id);
    localStorage.setItem('visData', JSON.stringify(obj));
  }

  private filterCat(cat: string, data: Metadata) {
    if ((data.category === cat || cat === '')) {
      return true;
    } else {
      return false;
    }
  }

  private filterInput(input: string, data: Metadata) {
    if (input === '' || input === undefined || data.title.toLowerCase().includes(input.toLowerCase())) {
      return true;
    } else {
      return false;
      }
    }

  private filterType(type: string, data: Metadata) {
    if ((data.type === type || type === '')) {
      return true;
    } else {
      return false;
    }
  }

  private filterAgeGroup(ageGroup: string, data: Metadata) {
      if (data.ageGroup === ageGroup || ageGroup === '') {
        return true;
      } else {
        return false;
      }
    }

  public filterCards() {
    const cardList = [];
    const input = this.filterInputString;
    const cat = this.filterCategoryString;
    const type = this.filterTypeString;
    const ageGroup = this.filterAgeGroupString;
    console.log('input: ' + input);
    console.log('cat: ' + cat);
    console.log('type: ' + type);
    console.log('ageGroup: ' + ageGroup);
    for (const data of this.allData) {
      // TODO make separate functions
      if ( this.filterInput(input, data) && this.filterCat(cat, data) && this.filterType(type, data)
        && this.filterAgeGroup(ageGroup, data)) {
        cardList.push(data);
      }
    }
    this.showData = cardList;
    console.log('items: ' + this.showData.length);
  }
}