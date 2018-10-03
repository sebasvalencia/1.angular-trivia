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
  currentQuestion: Question;
  questionIndex = 0;

  constructor(private service: QuestionService) {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.service.getQuestions().subscribe((questions: Question[]) => {
      this.questions = questions;
      this.currentQuestion = this.questions[this.questionIndex];
      console.log('questions: ', this.questions);
    });
  }

  checkAnswer(target: HTMLElement, isCorrect: boolean) {
    target = target.nodeName === 'SPAN' ? target.parentElement : target;
    console.log('target', target, 'isCorrect: ', isCorrect);

    if (isCorrect) {
      target.style.backgroundColor = 'green';
    } else {
      target.style.backgroundColor = 'red';
    }

  }

}
