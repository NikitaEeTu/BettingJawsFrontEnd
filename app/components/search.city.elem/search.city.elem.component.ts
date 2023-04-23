import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-city-elem',
  templateUrl: './search.city.elem.component.html',
  styleUrls: ['./search.city.elem.component.css']
})
export class SearchCityElemComponent implements OnInit {

  public allCountryInfo: Country[] = [];

  constructor() { }

  ngOnInit(): void {
    var country = require('country-list-js');
    this.allCountryInfo = Object.values(country.all);
  }

}

interface Country{
  capital: string,
  continent: string,
  currency: string,
  currency_decimal: string,
  currency_symbol: string,
  dialing_code: string,
  iso2: string,
  iso3: string,
  name: string
}

