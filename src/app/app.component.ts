import { Component, ViewChild, ElementRef } from '@angular/core';
import { QuestionService } from './question.service';
import { Question } from './question.interface';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';


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
  inWelcome = true;

  @ViewChild('mainWrapper') mainContainer: ElementRef;

  constructor(private service: QuestionService, public snackBar: MatSnackBar) {
    this.fetchQuestions();
  }

  startApp() {
    this.inWelcome = false;
  }

  fetchQuestions() {
    this.service.getQuestions().subscribe(
      (questions: Question[]) => {
      this.questions = questions.sort((a, b) =>  (0.5 - Math.random()));
      this.currentQuestion = this.questions[this.questionIndex];
      this.currentQuestion.options = this.currentQuestion.options.sort((a, b) => (0.5 - Math.random())); 
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
        () => this.transitionToNextQuestion(),
      );

    if (isCorrect) {
      target.classList.add('correct');
      this.correctAnswersCount++;
      this.answerMessage = 'That\'s correct. Congratulations!! 🎇 🤗 🎆';
    } else {
      target.classList.add('wrong');
      this.answerMessage = 'Maybe next time, keep learning!!💪💪';
    }
    this.snackBar.open(this.answerMessage,'', {
      duration: this.TRANSITION_SECONDS*1000,
    });
  }

  transitionToNextQuestion() {
    this.mainContainer.nativeElement.classList.add('hide');
    setTimeout(this.loadNextQuestion, 250);
  }

  loadNextQuestion = () => {
    this.mainContainer.nativeElement.classList.remove('hide');
    this.mainContainer.nativeElement.classList.add('show');
    this.answerMessage = '';
    if (this.questionIndex < this.questions.length) {
      this.currentQuestion = this.questions[
        ++this.questionIndex
      ];
    }
  }

  get finalScore() {
    return this.correctAnswersCount * this.QUESTION_SCORE;
  }

  get isGameOver() {
    return this.questionIndex === this.questions.length - 1;
  }

}
