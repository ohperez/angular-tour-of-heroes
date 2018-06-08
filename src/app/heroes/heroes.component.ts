import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
// import { HEROES } from '../mock-heroes';

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

	// hero: Hero = {
	// 	id: 1,
	// 	name: 'Windstorm'
	// };

	heroes: Hero[];

	// selectedHero: Hero;

	constructor(private heroService: HeroService) { }

	ngOnInit() {
		this.getHeroes();
	}

	// --- Metodo para cambiar de heroe con la funcion click

	// onSelect(hero: Hero): void {
	// 	this.selectedHero = hero;
	// }

	// getHerores (): void {
	// 	this.heroes = this.heroService.getHeroes();
	// }

	getHeroes(): void {
		this.heroService.getHeroes()
		.subscribe(heroes => this.heroes = heroes);
	}

}
