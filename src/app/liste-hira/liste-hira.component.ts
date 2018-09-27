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
        {value: 'ffpm', viewValue: 'FFPM'},
        {value: 'safif', viewValue: 'SAFIF'},
        {value: 'mm', viewValue: 'MM'},
        {value: 'an', viewValue: 'AN'},
        {value: 'ts', viewValue: 'TS'},
        {value: 'fk', viewValue: 'FK'},
        {value: 'ff', viewValue: 'FF'},
    ];


    constructor(private  _mysqlSercice: MysqlService,
                private _groupByPipe: GroupByPipe,
                private _objectToArrayPipe: ObjectToArrayPipe,
                private _fihiranaService: FihiranaService) {
    }

    ngOnInit() {
        this.fihirana$ = this._mysqlSercice.getAllFihirana();
        this.fihirana$.subscribe(data => {
            this.fihirana = <Fihirana []>data['body'];
            const fihiranaByLaharana = this._objectToArrayPipe.transform(this._groupByPipe.transform(this.fihirana, 'laharana', null));

            const fihiranaByLaharanaLohateny = fihiranaByLaharana.map(hiraTsirairay => {
                const hira = hiraTsirairay.value[0].texte;
                let title = hira.split('\n');
                title = title[0].replace(/,/g, '');
                title = title.replace(/\//g, '');
                const laharana = hiraTsirairay.value[0].laharana;
                let laharanaSuffix = laharana.substr(0, 2);
                const laharanaNumber = parseInt(laharanaSuffix);
                !isNaN(laharanaNumber) ? laharanaSuffix = 'FFPM ' + laharana : laharanaSuffix = laharana;
                const toReturn = Object.assign(hiraTsirairay, {
                    meta: {
                        'faha': laharanaSuffix,
                        lohateny: title,
                        'laharana-tsotra': laharana
                    }
                });
                return toReturn;
            });
            this.lohateny = fihiranaByLaharanaLohateny.map(hira => {
                return hira.meta;
            });
            this._fihiranaService.fihirana = fihiranaByLaharanaLohateny;
        });
    }

}
