import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ObjectToArrayPipe} from '../pipes/object-to-array.pipe';
import {MysqlService} from './mysql.service';
import {GroupByPipe, OrderByPipe} from 'ngx-pipes';
import {Fihirana} from '../models/fihirana/fihirana';


@Injectable()
export class FihiranaService {
    fihirana = [];

    constructor(private  _mysqlSercice: MysqlService,
                private _groupByPipe: GroupByPipe,
                private _orderByPipe: OrderByPipe,
                private _objectToArrayPipe: ObjectToArrayPipe) {
    }

    getHiraByLaharana(id) {
        return this.fihirana.find(el => {
            return el.key === id;
        });
    }

    getFihirana$() {
        return Observable.create(observer => {
            const fihirana$ = this._mysqlSercice.getAllFihirana();
            fihirana$.subscribe(data => {
                // console.log(data);
                const fihirana = <Fihirana []>data['body'];
                const fihiranaByLaharana = this._objectToArrayPipe.transform(
                    this._groupByPipe.transform(this._orderByPipe.transform(fihirana,
                        ['laharana', 'andininy']),
                        'laharana', null));
                const fihiranaByLaharanaLohateny = fihiranaByLaharana.map(hiraTsirairay => {
                    const hira = hiraTsirairay.value[0].texte;
                    let title = hira.split('\n');
                    title = title[0].replace(/,/g, '');
                    title = title.replace(/\//g, '');
                    title = title.replace(/:/g, '');
                    const laharana = hiraTsirairay.value[0].laharana;
                    let laharanaSuffix = laharana.substr(0, 2);
                    const laharanaNumber = parseInt(laharanaSuffix);
                    !isNaN(laharanaNumber) ? laharanaSuffix = 'FPM ' + laharana : laharanaSuffix = laharana;
                    const toReturn = Object.assign(hiraTsirairay, {
                        meta: {
                            'faha': laharanaSuffix,
                            lohateny: title,
                            'laharana-tsotra': laharana
                        }
                    });
                    return toReturn;
                });
                this.fihirana = fihiranaByLaharanaLohateny;
                console.log(fihiranaByLaharanaLohateny);
                observer.next(fihiranaByLaharanaLohateny);
                observer.complete();
                });
            });
    }
}
