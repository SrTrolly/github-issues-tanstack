import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GithubLabel } from '../../interfaces';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-labels-selector',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './labels-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsSelectorComponent {

  labels = input.required<GithubLabel[]>();

  issuesService = inject(IssuesService);

  isSelected(labelName: string): boolean {
    return this.issuesService.selectedLabels().has(labelName);
  }


  onToggleLabel(labelName: string) {
    this.issuesService.toggleLabel(labelName);
  }


}
