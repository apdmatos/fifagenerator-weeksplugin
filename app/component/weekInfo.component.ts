import { Component, Input } from '@angular/core';
import { Team } from '../model/team';

@Component({
  selector: 'week-info',
  template: `
    <div class="row" >
        <div class="col-xs-4 pull-left">
            <h2>Week <span class="label label-default">{{week}}</span></h2>
        </div>
        <div *ngIf=exemptTeam class="col-xs-4 pull-right well well-lg">
            <div class="row">
                <div class="col-xs-6">
                    Free this week:
                </div>
                <div class="col-xs-6">
                    <a href="{{exemptTeam.gamesUrl}}">
                        <img width="100" class="logo" src="{{exemptTeam.teamLogo}}">
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-8 pull-right label label-default">
                    {{exemptTeam.playername}}
                </div>
            </div>
        </div>
    </div>
  `
})
export class WeekInfoComponent {
    
    @Input()
    exemptTeam: Team;

    @Input()
    week: number;
}