import {Component, OnInit} from '@angular/core';
import {MysqlService} from './service/mysql.service';
import {Observable} from 'rxjs';
import {GroupByPipe} from 'ngx-pipes';
import {ObjectToArrayPipe} from './pipes/object-to-array.pipe';
import {Fihirana} from './models/fihirana/fihirana';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [GroupByPipe, ObjectToArrayPipe]
})

export class AppComponent implements OnInit {
    fihirana$: Observable<any>;
    fihirana: Fihirana[];
    fihiranaByLaharana: any [];
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
                private _objectToArrayPipe: ObjectToArrayPipe) {
    }

    ngOnInit() {
        this.fihirana$ = this._mysqlSercice.getAllFihirana();
        this.fihirana$.subscribe(data => {
            this.fihirana = <Fihirana []>data['body'];
            // console.log(this.fihirana);
            this.fihiranaByLaharana = this._objectToArrayPipe.transform(this._groupByPipe.transform(this.fihirana, 'laharana', null));
            // console.log(this.fihiranaByLaharana);
            this.lohateny = this.fihiranaByLaharana.map(hiraTsirairay => {
                const hira = hiraTsirairay.value[0].texte;
                let title = hira.split('\n');
                title = title[0].replace(/,/g, '');
                title = title.replace(/\//g, '');
                const laharana = hiraTsirairay.value[0].laharana;
                let laharanaSuffix = laharana.substr(0, 2);
                const laharanaNumber = parseInt(laharanaSuffix);
                !isNaN(laharanaNumber) ? laharanaSuffix = 'FFPM ' + laharana : laharanaSuffix = laharana;
                /*switch (laharanaSuffix) {
                    case 'MM':
                        laharanaSuffix = laharana;
                        break;
                    case 'A':
                        laharanaSuffix = laharana;
                        break;
                    case 'F':
                        laharanaSuffix = laharana;
                        break;
                    case 'S':
                        laharanaSuffix = laharana;
                        break;
                    case 'T':
                        laharanaSuffix = laharana;
                        break;
                    default:
                        laharanaSuffix = 'FFPM ' + laharana;
                }*/

                return {laharana: laharanaSuffix, lohateny: title, 'laharana-tsotra': laharana};
            });
            console.log(this.lohateny);
        });
    }
}
