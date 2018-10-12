import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class MysqlService {
    constructor(private _http: HttpClient,
                private snackBar: MatSnackBar) {

    }

    urlAllFihirana = 'http://localhost/back-traduction/read.fihirana.php';
    urlUpdateAndininy = 'http://localhost/back-traduction/update.andininy.php';

    // urlAllFihirana = 'http://192.168.1.10/back-traduction/read.fihirana.php';
    getAllFihirana() {
        return this._http.get(this.urlAllFihirana);
    }

    updateAndininy(data) {
        return this._http.post(this.urlUpdateAndininy, data)
            .subscribe(() => this.snackBar.open('Votre traduction a été enregistrée', '', {
                duration: 4000,
            }));
    }
}
