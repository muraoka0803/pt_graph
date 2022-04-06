import { Component } from 'react';
import './App.css';

/* RESAS APIから情報を取得 */
const apiKey = "KMVXho2JeqwEGj7mmawLCYh20DnKDYlzhyeAqnsK"; // APIキー

class App extends Component{

  constructor(){
    super();
    this.state = {
      prefectures: {},
    };
  }

  componentDidMount(){
    // 都道府県の一覧を取得
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {headers: {'X-API-KEY': apiKey}})
    .then(response => response.json())
    .then(res => {
      console.log(res.result);
      this.setState({prefectures: res.result});
    });
  }

  // 都道府県一覧の表示
  displayPref(props){
    return(
      <div key={props.prefCode}>{props.prefName}</div>
    );
  }

  render(){
    const prefs = this.state.prefectures;
    return (
      <div className="App">
        {Object.keys(prefs).map(i => this.displayPref(prefs[i]))}
        <div>Title</div>
        <div>チェックボックス</div>
        <div>グラフ</div>
      </div>
    );
  }
}

export default App;
