import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { LabelsSelectorComponent } from '../../components/labels-selector/labels-selector.component';
import { IssueItemComponent } from '../../components/issueItem/issueItem.component';
import { State } from '../../interfaces';


@Component({
  selector: 'app-issues-list-page',
  standalone: true,
  imports: [
    CommonModule,
    LabelsSelectorComponent,
    IssueItemComponent,
  ],
  templateUrl: './issues-list-page.component.html',
})
export default class IssuesListPageComponent {


  public issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesService.issiusQuery;
  }


  onChangeState(newState: string) {
    const state = {
      'all': State.All,
      'open': State.Open,
      'closed': State.Closed,
    }[newState] ?? State.All;

    this.issuesService.showIssuesByState(state);
  }

}
