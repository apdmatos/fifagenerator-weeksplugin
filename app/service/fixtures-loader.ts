import { Fixtures } from '../model/fixtures';
import { Game } from '../model/game';
import { GameResult } from '../model/gameresult';
import { Team } from '../model/team';
import { WeekGames } from '../model/weekgames';

const URL_REGEX: RegExp = new RegExp('http://www.fifagenerator.com/tournament/([0-9]+)/.*');
const EXTRACT_BODY_REGEX: RegExp = new RegExp('<body[^>]*>((.|[\n\r])*)</body>', 'im');

export function load() : Promise<Fixtures> {

    let tournamentId: string = URL_REGEX.exec(window.location.href)[1];
    let fixtures = new Fixtures();
    return loadTeams(tournamentId)
        .then(teams => {
            teams.forEach(team => fixtures.addTeam(team));
            return loadGames(tournamentId, fixtures);
        });
}

function loadTeams(tournamentId: string) : Promise<Array<Team>> {
    return Promise.resolve($.get('http://www.fifagenerator.com/tournament/' + tournamentId + '/table/'))
        .then(data => {
            let teams = $($.parseHTML(data)).find('div.row table.table.table-striped:first tbody tr td:nth-child(2) a');
            let teamsContainer: Array<Team> = [];
            teams.each(function(idx, teamElement) {
                let gamesUrl : string = $(teamElement).attr('href');
                let text = $(teamElement).text();
                let names = extractTeamAndPlayerName(text);
                let team : Team = new Team(names.playerName, names.teamName, gamesUrl);

                teamsContainer.push(team);
            });

            return teamsContainer;
        });
}

function loadGames(tournamentId: string, fixtures: Fixtures, page?: number, maxPages?: number) : Promise<Fixtures> {
	page = page ? page : 1;
	if(maxPages && page > maxPages) {
		return Promise.resolve(fixtures);
	}

    return Promise.resolve($.get('http://www.fifagenerator.com/tournament/' + tournamentId + '/fixtures/?page='+page))
        .then(data => {

            $('footer').append("<div id='locater' style='visibility:hidden;'></div>");
            let body = new RegExp('<body[^>]*>((.|[\n\r])*)</body>', 'im').exec(data)[0];
            $('footer div#locater').append($($.parseHTML(body)))

            let resultsElement = $('footer div#locater div.container div.row ul.fixture');
            if(!maxPages) {
                let href = $('footer div#locater .pagination li:last a').attr('href');
                maxPages = +(/\w*=(\d+)/.exec(href)[1]);
            }

            $('footer div#locater').remove();

            resultsElement.each(function(idx, resultElement) {

                let span = $(resultElement).find('li.list-group-item div.row span');

                let id: String = $(resultElement).data('fixture');
                let homeTeam: Team = extractTeam(span[0], fixtures);
                let awayTeam: Team = extractTeam(span[2], fixtures);
                let result: GameResult = extractResult(span[1]);

                let gameResult: GameResult = null;
                if(result.awayTeamGoals && result.awayTeamGoals) {
                    gameResult = result;
                }

                let game = new Game(id, homeTeam, awayTeam, page, gameResult);
                fixtures.addGame(game);
            });

            return loadGames(tournamentId, fixtures, page + 1, maxPages)
        });
}

////////////////////////////////////////////
// utility functions

function extractTeam(resultTeamElement, fixtures) : Team {

	var playerName = extractTeamAndPlayerName($(resultTeamElement).attr('title')).playerName;
	var team = fixtures.getTeam(playerName);
	if(!team.hasLogo()) {
		var logoUrl = $(resultTeamElement).find('img').attr('src');
		team.setLogo(logoUrl);
	}

	return team;
}

function extractResult(resultElement) : GameResult {
	return <GameResult> {
		homeTeamGoals: $(resultElement).find('.home').val(),
		awayTeamGoals: $(resultElement).find('.away').val()
	};
}

interface TeamAndPlayerName {
    teamName: string;
    playerName: string;
}

function extractTeamAndPlayerName(text) : TeamAndPlayerName {
	var regex = /(([a-zA-Z]*[^\x00-\x7F]*\s?)*)\s\((([a-zA-Z]*[^\x00-\x7F]*\s?)*)\)/ig;
	var result = regex.exec(text);
	return <TeamAndPlayerName> {
		teamName: result[1],
		playerName: result[3]
	};
}
