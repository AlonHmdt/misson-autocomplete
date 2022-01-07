import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {city} from "../models/city.model";
import {Observable} from "rxjs";
import {filter, map, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'assets/cities.json';

  constructor(private http: HttpClient) { }

  getCities(keyword: string): Observable<city[]> {
    return this.http.get(this.url).pipe(
      map((res: city[]) => res.filter(city => city.name.toLowerCase().includes(keyword.toLowerCase()))),
      map((data) => data.slice(0,5))
    );
  }
}
