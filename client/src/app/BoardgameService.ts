import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Boardgame } from "./Boardgame";

const URL = 'http://localhost:8080/'

@Injectable()
export class BoardgameService {

    http = inject(HttpClient)

    getBoardgamesByPage(limit: number, offset: number): Observable<Boardgame[]> {
        const params = new HttpParams().set('limit', limit).set('offset', offset)

        return this.http.get<Boardgame[]>(URL+'games', {params: params})
    }

    getBoardgamesByName(name: string): Observable<Boardgame[]> {
        const params = new HttpParams().set('name', name)

        return this.http.get<Boardgame[]>(URL+'gamesname', {params: params})
    }

}