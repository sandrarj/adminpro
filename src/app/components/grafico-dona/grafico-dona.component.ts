import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  //  public labels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  //  public data: MultiDataSet = [
  //    [350, 450, 100]
  //  ];
  //  public ctype: ChartType = 'doughnut';

  @Input() labels: Label[];
  @Input() data: MultiDataSet[];
  @Input() ctype: ChartType;

  constructor() { }

  ngOnInit() {
  }

}
