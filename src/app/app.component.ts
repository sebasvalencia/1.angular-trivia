import { Component } from '@angular/core';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  questions: any;

  constructor(private service: QuestionService) {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.service.getQuestions().subscribe((questions) => {
      this.questions = questions;
      console.log('questions: ', this.questions);
    });
  }

}
