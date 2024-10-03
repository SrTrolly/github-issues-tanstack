import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { RouterLink } from '@angular/router';
import { GitHubIssues, State } from '../../interfaces';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './issueItem.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItemComponent {

  public issue = input.required<GitHubIssues>();
  private issueService = inject(IssueService);

  get isOpen(): boolean {
    return this.issue().state === State.Open;
  }

  prefetchData() {
    // this.issueService.prefetchIssue(this.issue().number.toString());
    this.issueService.setIssueData(this.issue());
  }


}
