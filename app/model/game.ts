import { Team } from './team';
import { GameResult } from './gameresult';

export class Game {
    
    constructor(public id: String, public homeTeam: Team, public awayTeam: Team, 
        public websitePage: number, public result?: GameResult) {  }

    addResult(result: GameResult) : void {
        if(this.result != null) {
            // not possible to add a result!
            throw new TypeError("Game already have a result");
        }

        this.result = result;
    }

    hasResult(): Boolean {
        return !!this.result;
    }

    teamPlaysInGame(team: Team): Boolean {
        return this.homeTeam.equals(team) || this.awayTeam.equals(team);
    }
}