import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HEROES } from '../app/mock-heroes';
import { Hero } from '../app/hero';
import { Observable, of, observable } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})

export class HeroService {

	// getHeroes(): Hero[] {
	// 	return HEROES;
	// }
	private heroesUrl = 'api/heroes';  // URL to web api

	constructor(
		private messageService: MessageService,
		private http: HttpClient
	) { }

	// getHeroes(): Observable<Hero[]> {
	// 	// TODO: send the message _after_ fetching the heroes
	// 	this.messageService.add('HeroService: fetched heroes');
	// 	return of(HEROES);
	// }

	/** GET heroes from the server */
	getHeroes(): Observable<Hero[]> {
		return this.http.get<Hero[]>(this.heroesUrl)
			.pipe(
				tap(heroes => this.log('fetched heroes')),
				catchError(this.handleError('getHeroes', []))
			);
	}

	// getHero(id: number): Observable<Hero> {
	// 	// TODO: send the message _after_ fetching the hero
	// 	this.messageService.add(`HeroService: fetched hero id=${id}`);
	// 	return of(HEROES.find(hero => hero.id === id));
	// }

	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url)
			.pipe(
				tap(_ => this.log(`fetched hero Id=${id}`)),
				catchError(this.handleError<Hero>(`getHero id=${id}`))
			);
	}

	updateHero(hero: Hero): Observable<any> {
		return this.http.put(this.heroesUrl, hero, httpOptions)
			.pipe(
				tap(_ => this.log(`updated hero id=${hero.id}`)),
				catchError(this.handleError<any>('updateHero'))
			);
	}

	addHero(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
			.pipe(
				tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
				catchError(this.handleError<Hero>('addHero'))
			);
	}

	deleteHero(hero: Hero | number): Observable<Hero> {
		const id = typeof hero === 'number' ? hero : hero.id;
		const url = `${this.heroesUrl}/${id}`;

		return this.http.delete<Hero>(url, httpOptions)
		.pipe(
			tap(_ => this.log(`deleted hero id=${id}`)),
			catchError(this.handleError<Hero>('deleteHero'))
		);
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		this.messageService.add('HeroService: ' + message);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
