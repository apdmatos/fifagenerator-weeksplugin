import { Injectable } from '@angular/core';

import { Fixtures } from '../model/fixtures';
import { Game } from '../model/game';
import { GameResult } from '../model/gameresult';
import { Team } from '../model/team';
import { WeekGames } from '../model/weekgames';

import { load } from './fixtures-loader';

@Injectable()
export class FixturesService {
    
    getFixtures(): Promise<Fixtures> {

        // TODO: try to load games from localstorage

        return load();

        // TODO: save the games in localstorage
    }
}