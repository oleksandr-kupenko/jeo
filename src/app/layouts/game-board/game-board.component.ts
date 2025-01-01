import { Component } from '@angular/core';
import { Category, Question } from './interfaces/game-board.interfaces';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent {
  categories: Category[] = [
    {
      name: 'jQuery',
      questions: [
        {
          value: 100,
          question: 'Question 1',
          answer: 'Answer 1',
          isAnswered: false,
        },
        {
          value: 200,
          question: 'Question 2',
          answer: 'Answer 2',
          isAnswered: false,
        },
        {
          value: 300,
          question: 'Question 3',
          answer: 'Answer 3',
          isAnswered: false,
        },
        {
          value: 400,
          question: 'Question 4',
          answer: 'Answer 4',
          isAnswered: false,
        },
        {
          value: 500,
          question: 'Question 5',
          answer: 'Answer 5',
          isAnswered: false,
        },
      ],
    },
    {
      name: 'HTML',
      questions: [
        {
          value: 100,
          question: 'Question 1',
          answer: 'Answer 1',
          isAnswered: false,
        },
        {
          value: 200,
          question: 'Question 2',
          answer: 'Answer 2',
          isAnswered: false,
        },
        {
          value: 300,
          question: 'Question 3',
          answer: 'Answer 3',
          isAnswered: false,
        },
        {
          value: 400,
          question: 'Question 4',
          answer: 'Answer 4',
          isAnswered: false,
        },
        {
          value: 500,
          question: 'Question 5',
          answer: 'Answer 5',
          isAnswered: false,
        },
      ],
    },
    {
      name: 'JavaScript',
      questions: [
        {
          value: 100,
          question: 'Question 1',
          answer: 'Answer 1',
          isAnswered: false,
        },
        {
          value: 200,
          question: 'Question 2',
          answer: 'Answer 2',
          isAnswered: false,
        },
        {
          value: 300,
          question: 'Question 3',
          answer: 'Answer 3',
          isAnswered: false,
        },
        {
          value: 400,
          question: 'Question 4',
          answer: 'Answer 4',
          isAnswered: false,
        },
        {
          value: 500,
          question: 'Question 5',
          answer: 'Answer 5',
          isAnswered: false,
        },
      ],
    },
    {
      name: 'Python',
      questions: [
        {
          value: 100,
          question: 'Question 1',
          answer: 'Answer 1',
          isAnswered: false,
        },
        {
          value: 200,
          question: 'Question 2',
          answer: 'Answer 2',
          isAnswered: false,
        },
        {
          value: 300,
          question: 'Question 3',
          answer: 'Answer 3',
          isAnswered: false,
        },
        {
          value: 400,
          question: 'Question 4',
          answer: 'Answer 4',
          isAnswered: false,
        },
        {
          value: 500,
          question: 'Question 5',
          answer: 'Answer 5',
          isAnswered: false,
        },
      ],
    },
    {
      name: 'Ruby',
      questions: [
        {
          value: 100,
          question: 'Question 1',
          answer: 'Answer 1',
          isAnswered: false,
        },
        {
          value: 200,
          question: 'Question 2',
          answer: 'Answer 2',
          isAnswered: false,
        },
        {
          value: 300,
          question: 'Question 3',
          answer: 'Answer 3',
          isAnswered: false,
        },
        {
          value: 400,
          question: 'Question 4',
          answer: 'Answer 4',
          isAnswered: false,
        },
        {
          value: 500,
          question: 'Question 5',
          answer: 'Answer 5',
          isAnswered: false,
        },
      ],
    },
  ];

  onQuestionClick(category: Category, question: Question) {
    question.isAnswered = true;
  }
}
