import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-lohateny-card',
    templateUrl: './lohateny-card.component.html',
    styleUrls: ['./lohateny-card.component.css']
})
export class LohatenyCardComponent implements OnInit {
    @Input() hira: any;
    @Input() fihirana: any;

    constructor() {
    }

    ngOnInit() {
    }

}
