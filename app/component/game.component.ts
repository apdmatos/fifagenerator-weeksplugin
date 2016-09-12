import { Component, Input } from '@angular/core';
import { Game } from '../model/game';

@Component({
  selector: 'game',
  template: `
    <div class="col-lg-4 col-sm-6">
        <ul class="list-group fixture" attr.data-fixture={{game.id}}>
            <li class="list-group-item" [class.list-group-item-success]="game.hasResult()" [class.list-group-item-info]="!game.hasResult()">
                <div class="row">
                    <span class="col-xs-4 team home 95" title="{{game.homeTeam.teamName}} ({{game.homeTeam.playername}})">
                        <a href="{{game.homeTeam.gamesUrl}}">
                            <img class="logo" src="{{game.homeTeam.teamLogo}}">
                        </a>
                    </span>
                    <span class="col-xs-4 result">
                        <input name="home" type="tel" class="form-control home" value="{{homeTeamGoals}}" autocomplete="off"> - 
                        <input name="away" type="tel" class="form-control away" value="{{awayTeamGoals}}" autocomplete="off">
                    </span>
                    <span class="col-xs-4 team home 95" title="{{game.awayTeam.teamName}} ({{game.awayTeam.playername}})">
                        <a href="{{game.awayTeam.gamesUrl}}">
                            <img class="logo" src="{{game.awayTeam.teamLogo}}">
                        </a>
                    </span>
                </div>
            </li>
        </ul>
    </div>
  `
})
export class GameComponent {
    
    @Input()
    game: Game;

    get homeTeamGoals(): String {
        return this.game.result ? this.game.result.homeTeamGoals.toString() : "";
    }

    get awayTeamGoals(): String {
        return this.game.result ? this.game.result.awayTeamGoals.toString() : "";
    }
}