import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Fihirana} from '../models/fihirana/fihirana';
import {GroupByPipe} from 'ngx-pipes';
import {MysqlService} from '../service/mysql.service';
import {ObjectToArrayPipe} from '../pipes/object-to-array.pipe';
import {FihiranaService} from '../service/fihirana.service';

@Component({
    selector: 'app-liste-hira',
    templateUrl: './liste-hira.component.html',
    styleUrls: ['./liste-hira.component.css']
})
export class ListeHiraComponent implements OnInit {

    fihirana$: Observable<any>;
    fihirana: Fihirana[];
    // fihiranaByLaharana: any [];
    lohateny: any[];
    fihiranaType = [
        {value: '', viewValue: 'TOUS'},
        {value: 'fpm', viewValue: 'FFPM'},
        {value: 'safif', viewValue: 'SAFIF'},
        {value: 'mm', viewValue: 'MM'},
        {value: 'an', viewValue: 'AN'},
        {value: 'ts', viewValue: 'TS'},
        {value: 'fk', viewValue: 'FK'},
        {value: 'ff', viewValue: 'FF'},
    ];


    constructor(private _fihiranaService: FihiranaService) {
    }

    ngOnInit() {
        this._fihiranaService.getFihirana$().subscribe(fihirana => {
            this.lohateny = fihirana.map(hira => {
                return hira.meta;
            });
            this._fihiranaService.fihirana = fihirana;
            });
    }

}
