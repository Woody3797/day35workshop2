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
    limit = 15
    @Input()
    offset = 0
    @Input()
    name = ''
    games$!: Promise<Boardgame[]>
    gamesArr!: Boardgame[]
    nextDisabled = false

    gameService = inject(BoardgameService)

    fetchChanges(value: string) {
        this.limit = +value // +string changes it to a number if possible
        this.games$ = this.gameService.getBoardgamesByPagePromise(this.name, this.limit, this.offset)
    }

    ngOnInit(): void {
        this.games$ = this.gameService.getBoardgamesByPagePromise(this.name, this.limit, this.offset)
    }

    page(n: number) {
        if (n >= 0) {
            this.offset++
        } else {
            this.offset = Math.max(0, this.offset - 1)
        }
        this.games$ = this.gameService.getBoardgamesByPagePromise(this.name, this.limit, this.offset)
        this.games$.then(array => {
            this.gamesArr = array
            if (this.gamesArr.length < this.limit) {
                this.nextDisabled = true
            } else {
                this.nextDisabled = false
            }
        })
    }

    nameFilter(input: string) {
        this.name = input
        this.games$ = this.gameService.getBoardgamesByPagePromise(this.name, this.limit, this.offset)
    }

}
