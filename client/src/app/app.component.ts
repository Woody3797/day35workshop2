import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChildren, inject } from '@angular/core';
import { Observable, Subject, Subscription, debounceTime, filter, map, mergeMap, startWith, tap } from 'rxjs';
import { BoardgameService } from './BoardgameService';
import { Boardgame } from './Boardgame';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    bgService = inject(BoardgameService)
    fb = inject(FormBuilder)

    boardgames$!: Observable<Boardgame[]>
    form$!: FormGroup
    input = new Subject<string>
    sub!: Subscription
    @ViewChildren('results')
    resultsCount!: QueryList<any>
    nextDisabled = false
    count = 0

    ngOnInit(): void {
        this.form$ = this.fb.group({
            name: this.fb.control('', [Validators.required]),
            limit: this.fb.control(10, [Validators.min(0), Validators.max(50)]),
            pageNum: this.fb.control(1, [Validators.min(1)]),
        })

        this.sub = this.form$.valueChanges.pipe(
            debounceTime(300),
            map(() => this.getBoardgames(this.form$.get("name")?.value, this.form$.get("limit")?.value, this.form$.get("pageNum")?.value-1)),
        ).subscribe()
    }

    ngAfterViewInit(): void {
        this.form$.patchValue({
            pageNum: 1
        })
        this.form$.valueChanges.subscribe(
            data => {
                console.info(this.count),
                this.disableNext()
            }
        )
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
    }

    search(event: any) {
        this.input.next(event)
    }

    getBoardgamesByPage(limit: number, offset: number): Observable<Boardgame[]> {
        this.boardgames$ = this.bgService.getBoardgamesByPage(limit, offset)
        return this.boardgames$
    }

    getBoardgames(name: string, limit: number, offset: number): Observable<Boardgame[]> {
        this.boardgames$ = this.bgService.getBoardgames(name, limit, offset)
        return this.boardgames$
    }

    changePage(event: any) {
        if (event == 'previous') {
            this.form$.patchValue({
                pageNum: Math.max(this.form$.get("pageNum")?.value - 1, 1) 
            })
        } else if (event == 'next') {
            this.form$.patchValue({
                pageNum: Math.max(this.form$.get("pageNum")?.value + 1, 1) 
            })
        } else if (event == 1) {
            this.form$.patchValue({
                pageNum: 1 
            })
        }
    }

    disableNext() {
        this.count = this.resultsCount.toArray().length
        if (this.count < this.form$.get("limit")?.value) {
            this.nextDisabled = true
        } else {
            this.nextDisabled = false
        }
    }
}
