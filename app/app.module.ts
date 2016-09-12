import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import {Ng2PaginationModule} from 'ng2-pagination';

import { WeeksComponent }  from './component/weeks.component';
import { GameComponent }  from './component/game.component';

@NgModule({
    imports:      [ 
        BrowserModule,
        FormsModule,
        Ng2PaginationModule
    ],
    declarations: [ 
        WeeksComponent,
        GameComponent
    ],
    bootstrap:    [ WeeksComponent ]
})
export class AppModule { }
