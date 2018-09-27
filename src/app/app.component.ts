import {Component, OnInit} from '@angular/core';
import {GroupByPipe} from 'ngx-pipes';
import {ObjectToArrayPipe} from './pipes/object-to-array.pipe';




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [GroupByPipe, ObjectToArrayPipe]
})

export class AppComponent implements OnInit {



    constructor() {
    }

    ngOnInit() {

    }
}
