import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  @Input() queryLink: string;
  @Output() fireFavQuery = new EventEmitter();

  favorites: string[] = [];
  message: string;

  constructor() {}

  ngOnInit() {
    this.message = '';
    const favs = JSON.parse(localStorage.getItem('favs'));
    this.favorites = favs;

    if (this.favorites && this.favorites.length === 0) {
      this.message = 'Empty';
    }
  }

  addToFavorites() {
    this.message = '';
    let newFavorites = [];

    if (this.favorites) {
      if (!this.favorites.includes(this.queryLink)) {
        newFavorites = [...this.favorites, this.queryLink];

        this.favorites = newFavorites;
        localStorage.setItem('favs', JSON.stringify(newFavorites));
      } else {
        newFavorites = [...this.favorites];
      }
    }

    if (newFavorites && newFavorites.length === 0) {
      this.message = 'Empty';
    }
  }

  removeFav(fav: string) {
    this.favorites = this.favorites.filter(item => {
      return item !== fav;
    });

    localStorage.setItem('favs', JSON.stringify(this.favorites));
    if (this.favorites && this.favorites.length === 0) {
      this.message = 'Empty';
    }
  }

  fireQuery(query: string) {
    this.fireFavQuery.emit(query);
  }
}
