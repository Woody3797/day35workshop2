import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subject, debounceTime, filter, map, mergeMap } from 'rxjs';
import { BoardgameService } from './BoardgameService';
import { Boardgame } from './Boardgame';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    bgService = inject(BoardgameService)
    fb = inject(FormBuilder)

    boardgames$!: Observable<Boardgame[]>
    form$!: FormGroup
    input = new Subject<string>

    ngOnInit(): void {
        this.form$ = this.fb.group({
            name: this.fb.control('', [Validators.required]),
            limit: this.fb.control('', [Validators.min(0)])
        })

        this.boardgames$ = this.form$.valueChanges.pipe(
            debounceTime(500),
            mergeMap(v => this.getBoardgamesByPage(this.form$.get("limit")?.value, 0)),
        )
        
        // this.boardgames$ = this.title.pipe(
        //     filter(name => name.trim().length >= 0),
        //     debounceTime(300),
        //     mergeMap(name => this.bgService.getBoardgamesByName(name))
        // )
    }

    search(event: any) {
        console.info(event)
        this.input.next(event)
    }

    getBoardgamesByPage(limit: number, offset: number): Observable<Boardgame[]> {
        this.boardgames$ = this.bgService.getBoardgamesByPage(limit, offset)
        return this.boardgames$
    }

    // getBoardGamesByName(name: string) {
    //     this.boardgames$ = this.bgService.getBoardgamesByName(name)
    // }
}
