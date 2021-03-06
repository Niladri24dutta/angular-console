import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  ContextualActionBarService,
  ContextualTab
} from './contextual-action-bar.service';
import { CommandRunner, Messenger } from '@angular-console/utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-contextual-action-bar',
  templateUrl: './contextual-action-bar.component.html',
  styleUrls: ['./contextual-action-bar.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(`:enter`, animate(`500ms ease-in-out`))
    ]),
    trigger('growShrink', [
      state('void', style({ height: 0 })),
      state('*', style({ height: '48px' })),
      transition(`:enter`, animate(`250ms ease-in-out`)),
      transition(`:leave`, animate(`250ms ease-in-out`))
    ])
  ]
})
export class ContextualActionBarComponent {
  constructor(
    readonly contextualActionBarService: ContextualActionBarService,
    readonly commandRunner: CommandRunner,
    readonly messenger: Messenger
  ) {}

  trackByName(_: number, tab: ContextualTab) {
    return tab.name;
  }

  stopCommand() {
    this.commandRunner.stopCommand();
    this.messenger.notify('Command has been canceled');
  }
}
