export class Team {
    
	constructor(public playername: string, public teamName: string, 
        public gamesUrl: string, public teamLogo?: string) { }

	hasLogo(): Boolean {
		return !!this.teamLogo;
	}

	setLogo(logoUrl) : void {
		this.teamLogo = logoUrl;
	}

	equals(team: Team) : Boolean {
		return team.teamName === this.teamName;
	}
}