import { Component } from 'react';
import './App.css';

/* RESAS APIから情報を取得 */
const apiKey = "KMVXho2JeqwEGj7mmawLCYh20DnKDYlzhyeAqnsK"; // APIキー

// 都道府県一覧の取得

class App extends Component{

  componentDidMount(){
    // 都道府県の一覧を取得
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {headers: {'X-API-KEY': apiKey}})
    .then(response => response.json())
    .then(res => {
      console.log(res.result);
    });
  }

  render(){
    return (
      <div className="App">
        <div>Title</div>
        <div>チェックボックス</div>
        <div>グラフ</div>
      </div>
    );
  }
}

export default App;
