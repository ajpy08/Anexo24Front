import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  getOptionHeader(token: string) {
    const options = {
      headers: new HttpHeaders({
        'token': token,
      }),
    };
    return options;
  }
}
