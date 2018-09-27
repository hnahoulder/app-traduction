import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FihiranaService} from '../service/fihirana.service';

@Component({
  selector: 'app-hira-hadika',
  templateUrl: './hira-hadika.component.html',
  styleUrls: ['./hira-hadika.component.css']
})
export class HiraHadikaComponent implements OnInit {
lohateny: string;
  constructor(private _fihiranaService: FihiranaService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    console.log(this._fihiranaService.fihirana);
      this.route.params.subscribe(params => {
          const id = params['id']; // (+) converts string 'id' to a number
          const hira = this._fihiranaService.getHiraByLaharana(id);
          this.lohateny = hira.meta['lohateny'];

      });

  }

}
