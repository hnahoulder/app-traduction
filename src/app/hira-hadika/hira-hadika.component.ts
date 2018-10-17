import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FihiranaService} from '../service/fihirana.service';
// import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MysqlService} from '../service/mysql.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {ConfirmEditionComponent} from '../confirm-edition/confirm-edition.component';



@Component({
    selector: 'app-hira-hadika',
    templateUrl: './hira-hadika.component.html',
    styleUrls: ['./hira-hadika.component.css']
})
export class HiraHadikaComponent implements OnInit {
    lohateny: string;
    hiraHadika: any[];
    laharana: string;
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
    frenchText = {};
    onEdition = false;
    confirmResult = null;

    constructor(private _fihiranaService: FihiranaService,
                private route: ActivatedRoute,
                private router: Router,
                private mysqlService: MysqlService,
                private matDialog: MatDialog,
                private simpleModalService: SimpleModalService) {
    }

    rowNumber: number;
    fihiranaLength = 0;

    ngOnInit() {
        this.displayedColumns = this.columnNames.map(x => x.id);
        if (this._fihiranaService.fihirana.length < 1) {
            this._fihiranaService.getFihirana$().subscribe(fihirana => {
                this.lohateny = fihirana.map(hira => {
                    return hira.meta;
                });
                this._fihiranaService.fihirana = fihirana;


                this.writeTextOnInit();

            });
        } else {
            this.writeTextOnInit();
        }


    }

    saveTraduction() {
        this.mysqlService.updateAndininy(this.frenchText);
        this._fihiranaService.updateFihirana(this.rowNumber, this.frenchText);
        this.onEdition = false;
        console.log(this.frenchText);

    }

    onKeyPress() {
        this.onEdition = true;
    }


    writeTextOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('laharana'); // (+) converts string 'id' to a number
            this._fihiranaService.laharanaHira = id;
            this.writeText(id);

        });
    }

    writeText(id) {
        const hira = this._fihiranaService.getHiraByLaharana(id);
        this.rowNumber = this._fihiranaService.getRowNumber(id);
        this.fihiranaLength = this._fihiranaService.getFihiranaLength();
        this.lohateny = hira.meta['lohateny'];
        this.laharana = hira.meta['faha'].replace('FPM', 'FFPM');
        const hiraHadika = hira.value.map(h => {
            this.frenchText[h.id] = h.texte_francais;
            return {
                number_line: ((h.texte.match(/\n/g) || []).length + 2),
                texte: h.texte.replace(/\n/g, '<br/>'),
                texte_francais: h.texte_francais,
                // texte_francais: h.texte_francais.replace(/\n/g, '<br/>'),
                id: h.id
            };
        });
        this.hiraHadika = hiraHadika;
    }

    onButtonNext() {
        if (this.onEdition) {
            this.simpleModalService.addModal(ConfirmEditionComponent, {
                title: '',
                message: ''
            }).subscribe((isConfirmed) => {
                    if (!isConfirmed) {
                        return;
                    } else {
                        this.modifyHiraToTranslate(1);
                        this.onEdition = false;
                    }
                });
        } else {
            this.modifyHiraToTranslate(1);
        }
    }

    modifyHiraToTranslate(val) {
        const newRowNumber = this.rowNumber + val;
        const id = this._fihiranaService.getIdByRow(newRowNumber);
        this._fihiranaService.laharanaHira = id;
        this.router.navigate(['hira/', id], { });
    }


    onButtonPrevious() {
        if (this.onEdition) {
            this.simpleModalService.addModal(ConfirmEditionComponent, {
                title: '',
                message: ''
            }).subscribe((isConfirmed) => {
                    if (!isConfirmed) {
                        return;
                    } else {
                        this.modifyHiraToTranslate(-1);
                        this.onEdition = false;
                    }
                });
        } else {
            this.modifyHiraToTranslate(-1);
        }
    }

}

