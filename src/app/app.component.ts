import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import { switchMap} from "rxjs/operators";
import {HttpService} from "./srevice/http.service";
import {city} from "./models/city.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  results$: Observable<city[]>;
  subject = new Subject<string>();
  cityName: string = null;
  showResults: boolean;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.results$ = this.subject.pipe(
      switchMap(keyword => {
        return this.httpService.getCities(keyword);
      })
    )

  }

  search(keyword: string): void {
    if (!keyword || keyword === '' ) {
      this.showResults = false;
      return;
    }
    this.showResults = true;
    this.subject.next(keyword);
    return;
  }



  setValue(name: string): void {
    this.cityName = name;
    this.showResults = false;
  }
}
