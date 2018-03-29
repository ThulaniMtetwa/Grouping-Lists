
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  items: any[] = [];

  constructor() {
    this.items = [
      { title: 'one' },
      { title: 'two' },
      { title: 'three' },
      { title: 'four' },
      { title: 'five' },
      { title: 'six' }
    ]
  }

  filterItems(searchTerm): any[] {

    return this.items.filter((item) => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
