import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpService: HttpClient) {

   }

   getQuestions() {
     return this.httpService.get('./assets/questions.json');
   }

}
