import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FihiranaService} from '../service/fihirana.service';
import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-hira-hadika',
    templateUrl: './hira-hadika.component.html',
    styleUrls: ['./hira-hadika.component.css']
})
export class HiraHadikaComponent implements OnInit {
    lohateny: string;
    hiraHadika: any[];
    columnNames = [/*{
        id: 'id',
        value: 'No.'

    },*/ {
        id: 'texte',
        value: 'Parole en MG'
    },
        {
            id: 'texte_francais',
            value: 'Parole en FR'
        }];
    displayedColumns = [];
    test = 8;

    constructor(private _fihiranaService: FihiranaService,
                private route: ActivatedRoute,
                private router: Router,) {
    }

    ngOnInit() {
        this.displayedColumns = this.columnNames.map(x => x.id);
        if (this._fihiranaService.fihirana.length < 1) {
            this._fihiranaService.getFihirana$().subscribe(fihirana => {
                this.lohateny = fihirana.map(hira => {
                    return hira.meta;
                });
                this._fihiranaService.fihirana = fihirana;


                this.writeText();
            });
        } else {
            this.writeText();
        }


    }

    writeText() {
        this.route.params.subscribe(params => {
            const id = params['id']; // (+) converts string 'id' to a number
            const hira = this._fihiranaService.getHiraByLaharana(id);
            this.lohateny = hira.meta['lohateny'];

            /*const hiraHadika = hira.value.map(h => {
                return {texte: h.texte.replace(/\n/g, '<br/>'),
                    texte_francais: h.texte_francais.replace(/\n/g, '<br/>'),
                id: h.id, laharana: h.laharana, andininy: h.andininy};
            });*/
            const hiraHadika = hira.value.map(h => {
                return {
                    number_line: ((h.texte.match(/\n/g) || []).length + 2),
                    texte: h.texte.replace(/\n/g, '<br/>'),
                    texte_francais: h.texte_francais,
                    // texte_francais: h.texte_francais.replace(/\n/g, '<br/>'),
                    id: h.id
                };
            });
            console.log(hiraHadika);
            this.hiraHadika = hiraHadika;

        });
    }


}
