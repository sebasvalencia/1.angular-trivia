import { Component } from '@angular/core';
import { QuestionService } from './question.service';
import { Question } from './question.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  questions: Question[];

  constructor(private service: QuestionService) {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.service.getQuestions().subscribe((questions: Question[]) => {
      this.questions = questions;
      console.log('questions: ', this.questions);
    });
  }

}
