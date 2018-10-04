import { Component } from '@angular/core';
import { QuestionService } from './question.service';
import { Question } from './question.interface';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  questions: Question[];
  currentQuestion: Question;
  questionIndex = 0;
  answerMessage = '';
  correctAnswersCount = 0;
  readonly QUESTION_SCORE = 3;
  countdown: number;
  readonly TRANSITION_SECONDS = 5;
  readonly COUNTDOWN_INTERVAL = 1000;

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

    this.countdown = this.TRANSITION_SECONDS;

    interval(this.COUNTDOWN_INTERVAL)
      .pipe(
        take(this.TRANSITION_SECONDS))
      .subscribe(
        () => {
          this.countdown--;
        }, null,
        () => {
          this.answerMessage = '';
          if (this.questionIndex < this.questions.length) {
            this.currentQuestion = this.questions[++this.questionIndex];
            // console.log('this.currentQuestion: ', this.currentQuestion);
          }
        });

    if (isCorrect) {
      target.style.backgroundColor = 'green';
      this.correctAnswersCount++;
      this.answerMessage = 'Congratulations!!';
    } else {
      target.style.backgroundColor = 'red';
      this.answerMessage = 'Wrong answer';
    }
  }

  get finalScore() {
    return this.correctAnswersCount * this.QUESTION_SCORE;
  }

  get isGameOver() {
    return this.questionIndex === this.questions.length - 1;
  }

}
