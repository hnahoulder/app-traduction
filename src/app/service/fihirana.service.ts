import {Injectable} from '@angular/core';


@Injectable()
export class FihiranaService {
    fihirana = [];

    constructor() {
    }

    getHiraByLaharana(id) {
        return this.fihirana.find(el => {
            return el.key === id;
        });
    }
}
