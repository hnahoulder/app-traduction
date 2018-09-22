import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MysqlService {
    constructor(private _http: HttpClient) {

    }
    urlAllFihirana = 'http://localhost/back-traduction/read.fihirana.php';

    getAllFihirana() {
        return this._http.get(this.urlAllFihirana);
    }
}