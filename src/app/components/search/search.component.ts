import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search',
	template:   `	
					<div>
				 		<input type="text" placeholder="Search place" [ngModel]="inputValue" (ngModelChange)="oninputChange($event)" />
					</div>
				`,

    styles: [`

     		`]
})

export class SearchComponent {

	@Input() inputValue:string;
    @Output() inputValueChange = new EventEmitter<string>();
    
    oninputChange(model: string){
        this.inputValue = model;
        this.inputValueChange.emit(model);
	}
}

