import { Component } from 'react';
import { Label, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import './App.css';

import { data_sample } from './sample.js';

/* RESAS APIから情報を取得 */
const apiKey = "KMVXho2JeqwEGj7mmawLCYh20DnKDYlzhyeAqnsK"; // APIキー

class App extends Component{

  constructor(){
    super();
    this.state = {
      prefectures: {},  // 都道府県一覧のjson（{prefCode, prefName}）
    };
    this.sample = data_sample; // グラフデータのサンプル
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

  /* グラフの描画 */
  Graph(props){
    
    const maxYear = props.data.result.boundaryYear; // 最終年数
    const data = props.data.result.data[0].data;    // 人口データ

    return(
      <div>
        <LineChart
          width={800}
          height={500}
          data={data}
          margin={{top:64, right:128, bottom:32, left:32}}
        >
          <XAxis dataKey="year" type={'number'} allowDataOverflow="true" domain={['dataMin', maxYear]}>
            <Label value="年度" offset="64" position="right"/>
          </XAxis>
          <YAxis>
            <Label value="人口数" offset="32" position="top"/>
          </YAxis>
          <Legend align='right' verticalAlign='top'/>
          <Line name="prefName" type="lineer" dataKey="value"/>
        </LineChart>
      </div>
    )
  }

  // 都道府県一覧の表示
  displayPref(props){
    return(
      <div key={props.prefCode}>{props.prefName}</div>
    );
  }

  render(){
    const prefs = this.state.prefectures;
    const graphData = this.sample;
    return (
      <div className="App">
        {/* {Object.keys(prefs).map(i => this.displayPref(prefs[i]))} */}
        <div>Title</div>
        <div>チェックボックス</div>
        <div>グラフ</div>
        <this.Graph data={graphData}/>
      </div>
    );
  }
}

export default App;
