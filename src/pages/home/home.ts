import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  searchTerm: string = '';
  items: any[] = [];
  groupedContacts = [];
  searchControl: FormControl;
  searching: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    
    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }
  onSearchInput(): void {
    this.searching = true;
  }

  groupContacts(contacts) {

    let sortedContacts = contacts.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    let currentLetter = false;
    let currentContacts = [];
    this.groupedContacts = [];

    sortedContacts.forEach((value, index) => {

        if(value.title.charAt(0) != currentLetter){

            currentLetter = value.title.charAt(0);

            let newGroup = {
                letter: currentLetter,
                contacts: []
            };

            currentContacts = newGroup.contacts;
            this.groupedContacts.push(newGroup);

        }

        currentContacts.push(value);

    });

  }

  setFilteredItems(): void {
    this.items = this.dataService.filterItems(this.searchTerm);
    this.groupContacts(this.items);
  }

}
