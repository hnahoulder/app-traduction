import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';


export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
  selector: 'app-confirm-edition',
  templateUrl: './confirm-edition.component.html',
  styleUrls: ['./confirm-edition.component.css']
})
export class ConfirmEditionComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel{
    title: string;
    message: string;
    constructor() {
        super();
    }

    confirm() {
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }

}
