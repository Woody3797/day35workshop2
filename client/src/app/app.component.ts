import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject, Subscription, debounceTime, filter, map, mergeMap, startWith, tap } from 'rxjs';
import { BoardgameService } from './BoardgameService';
import { Boardgame } from './Boardgame';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    bgService = inject(BoardgameService)
    fb = inject(FormBuilder)

    boardgames$!: Observable<Boardgame[]>
    form$!: FormGroup
    input = new Subject<string>
    sub!: Subscription
    @Input()
    pageInput = new Subject<number>

    ngOnInit(): void {
        this.form$ = this.fb.group({
            name: this.fb.control('', [Validators.required]),
            limit: this.fb.control(10, [Validators.min(0), Validators.max(50)]),
            pageNum: this.fb.control(1, [Validators.min(1)]),
        })

        this.sub = this.form$.valueChanges.pipe(
            tap(v => console.info(v)),
            debounceTime(500),
            map(() => this.getBoardgamesByPage(this.form$.get("limit")?.value, this.form$.get("pageNum")?.value-1 ? 0 : this.form$.get("pageNum")?.value-1)),
        ).subscribe()
        
        // this.boardgames$ = this.title.pipe(
        //     filter(name => name.trim().length >= 0),
        //     debounceTime(300),
        //     mergeMap(name => this.bgService.getBoardgamesByName(name))
        // )
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
    }

    search(event: any) {
        console.info(event)
        this.input.next(event)
    }

    getBoardgamesByPage(limit: number, offset: number): Observable<Boardgame[]> {
        this.boardgames$ = this.bgService.getBoardgamesByPage(limit, offset)
        return this.boardgames$
    }

    changePage(event: any) {
        console.info(event)
        if (this.form$.get("pageNum")?.value + event > 0) {
            this.form$.patchValue({
                pageNum: this.form$.get("pageNum")?.value + event
            })
        } else if (event['pageNum'] == null) {
            console.info(event['pageNum'])
            this.form$.patchValue({
                pageNum: 1
            })
        }
    }

    // getBoardGamesByName(name: string) {
    //     this.boardgames$ = this.bgService.getBoardgamesByName(name)
    // }
}
