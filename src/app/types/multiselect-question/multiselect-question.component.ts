import {Component, OnInit, Input} from '@angular/core';
import {QuestionnaireItemComponent} from "../../questionnaire-item/questionnaire-item.component";
import {QuestionnaireService} from "../../questionnaire.service";
import {QuestionModel} from "../../_models/question.model";
import {AnswerModel} from "../../_models/answer.model";

@Component({
  selector: 'multiselect-question',
  templateUrl: './multiselect-question.component.html',
  styleUrls: ['./multiselect-question.component.css']
})
export class MultiselectQuestionComponent implements OnInit {
  @Input() qItem: QuestionModel;

  private givenAnswer: AnswerModel[] = [];

  constructor(
    private qService: QuestionnaireService
  ) { }

  ngOnInit() {
  }

  private handleMultiSelect(answer): void {
    let index = this.givenAnswer.indexOf(answer, 0);
    if (index == -1) {
      //add item
      this.givenAnswer.push(answer);
    }else{
      //remove item
      this.givenAnswer.splice(index, 1);
    }
  }

  private nextQuestion(): void {

    if (this.qService.domainPhase) {
        this.qService.QUESTIONNAIRE.selectedDomainList = this.givenAnswer;
    } else {
      this.qService.QUESTIONNAIRE.completedQuestionList[this.qService.QUESTIONNAIRE.currentQuestionIndex].givenAnswerList = this.givenAnswer;
    }
    this.givenAnswer = [];
      this.qService.updateQuestionnaire();
  }

    private previousQuestion(): void {
        this.givenAnswer = [];
        this.qService.showPreviousQuestion();
    }
}
