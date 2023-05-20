import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject, Subscription, debounceTime, filter, first, map, mergeMap, startWith, tap } from 'rxjs';
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
    sub$!: Subscription
    gamesArr!: Boardgame[]
    nextDisabled = false
    prevDisabled = false

    ngOnInit(): void {
        this.form$ = this.fb.group({
            name: this.fb.control('', [Validators.required]),
            limit: this.fb.control(11, [Validators.min(0), Validators.max(50)]),
            pageNum: this.fb.control(1, [Validators.min(1)]),
        })

        this.sub$ = this.form$.valueChanges.pipe(
            debounceTime(400),
            mergeMap(() => this.boardgames$ = this.bgService.getBoardgames(this.form$.get("name")?.value, this.form$.get("limit")?.value, this.form$.get("pageNum")?.value - 1)),
        ).subscribe(array => {
            this.gamesArr = array
            if (this.gamesArr.length < this.form$.get("limit")?.value) {
                this.nextDisabled = true
            } else {
                this.nextDisabled = false
            }
            if (this.form$.get("pageNum")?.value == 1) {
                this.prevDisabled = true
            } else {
                this.prevDisabled = false
            }
        })
    }

    ngAfterViewInit(): void {
        this.form$.patchValue({
            pageNum: 1
        })
    }

    ngOnDestroy(): void {
        this.sub$.unsubscribe()
    }

    // search(event: any) {
    //     this.input.next(event)
    // }

    // getBoardgames(name: string, limit: number, offset: number): Observable<Boardgame[]> {
    //     this.boardgames$ = this.bgService.getBoardgames(name, limit, offset)
    //     return this.boardgames$
    // }

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

    changeLimit(event: any) {
        console.info(event)
        if (event == 1) {
            this.form$.patchValue({
                limit: Math.max(1, this.form$.get('limit')?.value)
            })
        }
    }
}
