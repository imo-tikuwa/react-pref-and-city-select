import React from 'react';
import { Form } from 'react-bootstrap';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const prefs = {
  0: '　',
  1: '北海道',  2: '青森県',  3: '岩手県',  4: '宮城県',  5: '秋田県',  6: '山形県',  7: '福島県',
  8: '茨城県',  9: '栃木県',  10: '群馬県',  11: '埼玉県',  12: '千葉県',  13: '東京都',  14: '神奈川県',
  15: '新潟県',  16: '富山県',  17: '石川県',  18: '福井県',  19: '山梨県',  20: '長野県',  21: '岐阜県',
  22: '静岡県',  23: '愛知県',  24: '三重県',  25: '滋賀県',  26: '京都府',  27: '大阪府',  28: '兵庫県',
  29: '奈良県',  30: '和歌山県',  31: '鳥取県',  32: '島根県',  33: '岡山県',  34: '広島県',  35: '山口県',
  36: '徳島県',  37: '香川県',  38: '愛媛県',  39: '高知県',  40: '福岡県',  41: '佐賀県',  42: '長崎県',
  43: '熊本県',  44: '大分県',  45: '宮崎県',  46: '鹿児島県',  47: '沖縄県'
},
city_api_base = 'https://www.land.mlit.go.jp/webland/api/CitySearch?area=';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pref: '', city: ''};
  }

  createSelectItems() {
    let items = [];
    Object.keys(prefs).forEach(function(key) {
      items.push(<option key={key} value={this[key]}>{this[key]}</option>)
    },　prefs)
    return items;
  }

  onPrefSelected(e) {
    console.log("pref value is ", e.target.value);
    this.setState({pref: e.target.value, city: ''});
  }

  onCitySelected(e) {
    console.log("city value is", e.target.value);
    this.setState({pref: '', city: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Form as="select" onChange={this.onPrefSelected.bind(this)} label="Pref Select">
            {this.createSelectItems()}
          </Form>
          <Form as="select" onChange={this.onCitySelected.bind(this)} label="City Select">
            {/* {this.createSelectItems()} */}
          </Form>
        </header>
      </div>
    );
  }
}
