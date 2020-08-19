import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, AfterViewInit, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take, shareReplay } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

export interface Item {
    value: string;
    label: string;
}
  
@Component({
    selector: 'mat-select-search',
    templateUrl: './mat-select-search.component.html',
    styleUrls: ['./mat-select-search.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => MatSelectSearchComponent ),
            multi: true
        }
    ]
})
export class MatSelectSearchComponent implements ControlValueAccessor,  OnInit, OnDestroy {

    public filteredList: ReplaySubject<Item[]> = new ReplaySubject<Item[]>(1);

    public listFilterCtrl: FormControl = new FormControl( '' );

    public itemCtrl: FormControl = new FormControl(null);

    protected _onDestroy = new Subject();

    @Input() 
        list: Item[] = [];

    @Input()
        label: string = '';

    @Input()
        isMultiple: boolean = false;

    @Input()
        searchPlaceholderLabel: string = '';

    @ViewChild( 'matSelect', { static: false } ) matSelectEl: MatSelect;

    ngOnInit() {
        // Load the initial list
        this.filteredList.next( this.list )

        // Listen for the search value change
        this.listFilterCtrl.valueChanges.pipe(
            takeUntil( this._onDestroy )
        ).subscribe( () => {
            this.filterList()
        } );
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    protected filterList() {
        if( !this.list ) {
            return;
        }

        /**
         * Get the search key word
         */
        let search: string = this.listFilterCtrl.value;

        if( !search ) {
            this.filteredList.next( this.list.slice() );
            return;
        } else {
            search = search.toLowerCase();
        }

        /**
         * Filter the list
         */
        this.filteredList.next(
            this.list.filter( ( item: Item ) => item.label.toLowerCase().indexOf( search ) > -1 )
        )
    }

    writeValue( value: any ): void {
        this.itemCtrl.setValue( value );
    }

    registerOnChange( fn: any ): void {
        this.itemCtrl.valueChanges.subscribe( fn );
    }
    registerOnTouched() {}
}
