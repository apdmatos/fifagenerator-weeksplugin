import { Game } from './game';
import { Fixtures } from './fixtures';
import { Team } from './team';

export class WeekGames {

    private _games: Array<Game> = [];
  
    constructor(private fixtures: Fixtures) {  }

    get games(): Array<Game> {
        return this._games;
    }

    canAddGame(game: Game): Boolean {
        let numberOfTeams = this.fixtures.teams.length;
        let numberOfGamesPerWeek = Math.floor(numberOfTeams / 2);
        return this._games.length < numberOfGamesPerWeek;
    }

    addGame(game: Game) : void {
        if(!this.canAddGame(game)) {
        throw new TypeError("Cannot add a new game to this week");
        }

        this._games.push(game);
    }

    numberOfGames(): number {
        return this._games.length;
    }

    hasAnyGamePlayed(): Boolean {
        for(let i: number = 0 ; i < this._games.length; ++i) {
            let game : Game = this._games[i];
            if(game.hasResult()) {
                return true;
            }
        }
        return false;
    }

    getExemptTeam() : Team {
        let len = this.fixtures.teams.length;
        for(let i = 0; i < len; ++i) {

            let team = this.fixtures.teams[i];
            let isInGame = false;

            for(let j = 0; j < this._games.length; ++ j) {

                let game = this._games[j];
                if(game.teamPlaysInGame(team)) {
                    isInGame = true;
                    break;
                }
            }

            if(!isInGame) {
                return team;
            }
        }

        // no exempt teams...
        return null;
    }
}