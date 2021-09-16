import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { MarketDataService} from '../../services/market-data.service';
import { formatDate, formatNumber } from '@angular/common';
import { ThousandSuffixesPipe } from '../../pipes/thousand-suffixes.pipe';

@Component({
  selector: 'app-marke-table',
  templateUrl: './marke-table.component.html',
  styleUrls: ['./marke-table.component.css'],
  providers: [ThousandSuffixesPipe]
})
export class MarkeTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'value', 'date'];
  marketData!: MarketData[];

  constructor(@Inject(LOCALE_ID) private locale: string, private marketDataService: MarketDataService, private thousandSuffixesPipe: ThousandSuffixesPipe) {
    this.marketDataService.getAccessToken().subscribe(data => {
      this.marketDataService.setToken(data);
      this.marketDataService.getMarketData().subscribe((data: any) => {
        const fields = data.quotes[0].fields;
        const MARKET_DATA: MarketData[] = [
          {name: 'Last', value: fields.LVAL_NORM.v, date: formatDate(fields.LVAL_NORM.d, 'HH:mm:ss', this.locale)},
          {name: 'Close', value: fields.CLOSE_ADJ_NORM.v, date: formatDate(fields.CLOSE_ADJ_NORM.d, 'MM/dd/YYYY', this.locale)},
          {name: 'Day Change %', value: `${formatNumber(fields.NC2_PR_NORM.v, this.locale, '1.2-2')}%`, class: this.obtainCss(fields.NC2_PR_NORM.v)},
          {name: 'Day Change', value: fields.NC2_NORM.v, class: this.obtainCss(fields.NC2_NORM.v)},
          {name: 'Volume', value: this.thousandSuffixesPipe.transform(fields.VOL.v, 3)},
          {name: 'Turnover', value: this.thousandSuffixesPipe.transform(fields.TUR.v, 3)},
          {name: 'Previous year close', value: fields.PY_CLOSE.v, date: formatDate(fields.PY_CLOSE.d, 'MM/dd/YYYY', this.locale)},
          {name: 'YTD %', value: `${formatNumber(fields.YTD_PR_NORM.v, this.locale, '1.2-2')}%`, class: this.obtainCss(fields.YTD_PR_NORM.v)}
        ]
        this.marketData = MARKET_DATA;
      });
    });
  }

  ngOnInit(): void {
  }

  obtainCss(value: number) {
    return value >= 0 ? 'green' : 'red';
  }

}

export interface MarketData {
  name: string;
  value: number | string;
  date?: string;
  class?: string;
}
