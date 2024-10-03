import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';

@Component({
  selector: 'app-issue-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IssueCommentComponent
  ],
  templateUrl: './issue-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuePageComponent {

  route = inject(ActivatedRoute);
  issueService = inject(IssueService);


  public issueQuery = this.issueService.issueQuery;
  public issueComments = this.issueService.commentsQuery;

  issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map(params => params.get('number') ?? ''),
      tap((issueNumber) => this.issueService.setIssueNumber(issueNumber))
    )
  );




}
