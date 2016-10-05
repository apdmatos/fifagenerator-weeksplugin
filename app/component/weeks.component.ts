import { Component, OnInit } from '@angular/core';
import {PaginatePipe, PaginationService, PaginationControlsCmp, IPaginationInstance} from 'ng2-pagination';

import { Fixtures } from '../model/fixtures';
import { Game } from '../model/game';
import { Team } from '../model/team';
import { WeekGames } from '../model/weekgames'
import { FixturesService } from '../service/fixtures-service'

@Component({
  selector: 'week-games',
  template: `
    <div *ngIf=availableGamesInWeek>
        <week-info [exemptTeam]=exemptTeam [week]=currentWeek></week-info>
        <div class="row">
            <game *ngFor="let game of weekGames | paginate: { id: 'server', itemsPerPage: weekGames.length, currentPage: currentWeek, totalItems: numberOfGames }" [game]=game></game>
        </div>
        <div class="row">
            <pagination-controls #pagination (pageChange)="goToWeek($event)" id="server">
                <div class="col-xs-12 text-center">
                    <ul class="pagination">
                        <li class="prev" [class.disabled]="pagination.isFirstPage()">
                            <a (click)="pagination.previous()" href="#weeks-1">«</a>
                        </li>
                        <li *ngFor="let page of pagination.pages" [class.active]="pagination.getCurrent() === page.value">
                            <a (click)="pagination.setCurrent(page.value)" href="#weeks-{{ page.value }}">{{ page.label }}</a>
                        </li>
                        <li class="last" [class.disabled]="pagination.isLastPage()">
                            <a (click)="pagination.next()" href="#weeks-{{ pagination.pages.length }}">»</a>
                        </li>
                    </ul>
                </div>
            </pagination-controls>
        </div>
    </div>
    <div class="row text-center" *ngIf=!availableGamesInWeek>Loading games... Please be patient</div>
  `,
  providers: [FixturesService],
  pipes: [PaginatePipe]
})
export class WeeksComponent implements OnInit {
    
    fixtures: Fixtures;
    page: number;

    constructor(private fixturesService: FixturesService) { }
    
    goToWeek(week: number): void {
        this.page = week;
    } 

    get weekGames(): Array<Game> {
        if(!this.fixtures) {
            return [];
        }

        let weekGames : WeekGames = this.fixtures.getGamesForWeek(this.page);
        return weekGames ? weekGames.games : [];
    }

    get availableGamesInWeek(): Boolean {
        let games : Array<Game> = this.weekGames;
        return games && games.length > 0;
    }

    get currentWeek(): number {
        return this.page;
    }

    get numberOfGames(): number {
        return this.fixtures.numberOfGames();
    }

    get exemptTeam() : Team {
        return this.fixtures.getExemptTeamOnWeek(this.page);
    }

    ngOnInit(): void {

        // todo: load page from the route
        this.fixturesService.getFixtures()
            .then(fixtures => 
            {
                if(!this.page) {
                    this.page = fixtures.getCurrentWeek();
                }
                this.fixtures = fixtures;
            });
    }
}