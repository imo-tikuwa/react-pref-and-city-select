import React from 'react';
import { Form } from 'react-bootstrap';
import $ from 'jquery';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import prefs from './data/prefs.json';

const city_api_base = 'https://www.land.mlit.go.jp/webland/api/CitySearch?area=';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.onPrefSelected = this.onPrefSelected.bind(this)
    this.onCitySelected = this.onCitySelected.bind(this)

    this.state = {
      pref: '',
      city: ''
    }
  }

  onPrefSelected(e) {
    console.log("pref value is ", e.target.value);
    this.setState({pref: e.target.value, city: ''});
  }

  onCitySelected(e) {
    console.log("city value is", e.target.value);
    this.setState({city: e.target.value});
  }

  render() {
    console.log("render");
    let prefItems = [];
    Object.keys(prefs).forEach(function(key) {
      prefItems.push(<option key={key} value={key}>{this[key]}</option>)
    }, prefs)

    let cityItems = [];
    if (this.state.pref > 0) {
      let cities, storageKey = `city${this.state.pref}!`;
      if (storageKey in localStorage) {
        console.log("storageから取得");
        cities = JSON.parse(localStorage.getItem(storageKey));
      } else {
        console.log("ajaxから取得");
        let result = $.ajax({
          type: 'GET',
          url: city_api_base + ('00' + this.state.pref).slice(-2),
          dataType: 'json',
          cache: 'no-cache',
          async: false
        }).responseJSON;
        cities = result.data;
        localStorage.setItem(storageKey, JSON.stringify(cities));
      }
      cityItems.push(<option key={0} value={0}>　</option>)
      Object.keys(cities).forEach(function(city) {
        cityItems.push(<option key={this[city].id} value={this[city].id}>{this[city].name}</option>)
      }, cities)
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Form as="select" onChange={this.onPrefSelected}  value={this.state.pref} label="Pref Select">
            {prefItems}
          </Form>
          <Form as="select" onChange={this.onCitySelected} value={this.state.city} label="City Select">
            {cityItems}
          </Form>
        </header>
      </div>
    );
  }
}
