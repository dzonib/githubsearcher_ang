import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  queryLink: string;
  queries = [];
  total: number[];
  favorites: string[];
  showLoader = false;
  page = 1;

  constructor(public searchService: SearchService) {}

  ngOnInit() {

  }

  handleClick(passedQuery: string) {
    this.showLoader = true;
    if (passedQuery) {
      this.queryLink = passedQuery;
    }

    this.searchService.getRepos(this.queryLink).subscribe(data => {
      const pages = Math.floor(data.total_count / 5);

      this.queries = data.items;
      this.total = Array(pages);
      this.showLoader = false;
    });
  }

  setPage(page: number) {
    this.page = page;
    this.searchService.getRepos(this.queryLink, page).subscribe(data => {
      this.queries = data.items;
    });
  }


}
