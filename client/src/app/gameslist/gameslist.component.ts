import { Component, Input, OnInit, inject } from '@angular/core';
import { Boardgame } from '../Boardgame';
import { BoardgameService } from '../BoardgameService';

@Component({
  selector: 'app-gameslist',
  templateUrl: './gameslist.component.html',
  styleUrls: ['./gameslist.component.css']
})
export class GameslistComponent implements OnInit {

    @Input()
    limit = 5
    @Input()
    offset = 0
    @Input()
    filter = ''
    games$!: Promise<Boardgame[]>

    gameService = inject(BoardgameService)

    fetchChanges(limit: string) {
        this.limit = +limit
        this.games$ = this.gameService.getBoardgamesByPagePromise(this.limit, this.offset)
    }

    ngOnInit(): void {
        this.games$ = this.gameService.getBoardgamesByPagePromise(this.limit, this.offset)
    }

    page(n: number) {
        if (n >= 0) {
            this.offset += this.offset + this.limit
        } else {
            this.offset = Math.max(0, this.offset - this.limit)
        }
        this.games$ = this.gameService.getBoardgamesByPagePromise(this.limit, this.offset)
    }

    nameFilter(input: string) {
        this.filter = input
    }

}
