import { Team } from './team';
import { WeekGames } from './weekgames';
import { Game } from './game';

export class Fixtures {
    
    private _teams: Array<Team> = [];
    private _weekGames: Array<WeekGames> = [];
    private weekGameIdx: number = 0;

    constructor() {}
    
    get teams() : Array<Team> {
        return this._teams;
    } 

    getGamesForWeek(week: number) : WeekGames {
        week -= 1; 
        if(week < 0 || week >= this._weekGames.length) {
            return null;
        }

        return this._weekGames[week];
    }

    numberOfGames(): number {
        if(this._weekGames.length == 0) {
            return 0;
        }

        return this._weekGames.length * this._weekGames[0].numberOfGames();
    }

	hasTeam(playerName: string): Boolean {
        return !!this.getTeam(playerName);
	}

    getTeam(playerName: string): Team {
        return this._teams.find(team => team.playername === playerName);
    }

	addTeam(team: Team): void {
        if(!this.hasTeam(team.playername)) {
        this._teams.push(team);
        }
	}

    addGame(game: Game): void {
		if(this._weekGames.length === 0) {
            let weekgamesContainer = new WeekGames(this);
            this._weekGames.push(weekgamesContainer)
        }

        let weekGames = this._weekGames[this._weekGames.length - 1];
        if(!weekGames.canAddGame(game)) {
            // create a new week
            let weekgamesContainer = new WeekGames(this);
            this._weekGames.push(weekgamesContainer)
            weekgamesContainer.addGame(game);
        } else {
            weekGames.addGame(game);
        }
	}

    getCurrentWeek(): number {
        for(let i: number = 0; i < this._weekGames.length; ++i) {
            let weekGames : WeekGames = this._weekGames[i];
            if(!weekGames.hasAnyGamePlayed()) {
                return i;
            }
        }

        return this._weekGames.length;
    }

}