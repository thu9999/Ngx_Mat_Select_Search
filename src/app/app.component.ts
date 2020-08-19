import { Component, OnInit } from '@angular/core';
import { Item } from './components/mat-select-search/mat-select-search.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    foods: Item[] = [
        { value: '1', label: 'Steak' },
        { value: '2', label: 'Pizza' },
        { value: '3', label: 'Tacos' },
        { value: '4', label: 'Hamburger' },
        { value: '5', label: 'Break' },
        { value: '6', label: 'Hot dogs' },
        { value: '7', label: 'Eggs' },
        { value: '8', label: 'Spaghetti' },
        { value: '9', label: 'Noodles' },
        { value: '10', label: 'Dimsum' },
        { value: '11', label: 'Beef' },
        { value: '12', label: 'Chicken' },
        { value: '13', label: 'Oaks' },
        { value: '14', label: 'Cucumber' },
        { value: '15', label: 'Vegetables' },
        { value: '16', label: 'Rice' },
        { value: '17', label: 'Mushrooms' },
        { value: '18', label: 'Coconut' }
    ];

    public foodCtrl: FormControl = new FormControl( [ '1', '2', '3', '4' ] );

    ngOnInit() {
        this.foodCtrl.valueChanges.subscribe(console.log)
    }
}
