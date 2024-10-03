import { Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';
import { GitHubIssues } from '../interfaces/github-issues.interface';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueNumber = signal<string | null>(null);
  private queryClient = injectQueryClient();

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
    staleTime: 1000 * 60 * 5
  }));


  commentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null
  }));

  setIssueNumber(issueId: string) {
    console.log(issueId);
    this.issueNumber.set(issueId);
  }

  prefetchIssue(issueId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId),
      staleTime: 1000 * 60 * 5
    });
  }

  setIssueData(issue: GitHubIssues) {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60,
    });
  }

}
