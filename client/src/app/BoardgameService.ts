import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";
import { Boardgame } from "./Boardgame";

const URL = 'http://localhost:8080/'

@Injectable()
export class BoardgameService {

    http = inject(HttpClient)

    getBoardgamesByPage(limit: number, offset: number): Observable<Boardgame[]> {
        const params = new HttpParams().set('limit', limit).set('offset', offset)

        return this.http.get<Boardgame[]>(URL+'gamespage', {params: params})
    }

    getBoardgamesByPagePromise(name: string, limit: number, offset: number): Promise<Boardgame[]> {
        const params = new HttpParams().set('name', name).set('limit', limit).set('offset', offset)

        return firstValueFrom(this.http.get<Boardgame[]>(URL+'games', {params}))
    }

    getBoardgames(name: string, limit: number, offset: number): Observable<Boardgame[]> {
        const params = new HttpParams().set('name', name).set('limit', limit).set('offset', offset)

        return this.http.get<Boardgame[]>(URL+'games', {params: params})
    }
}