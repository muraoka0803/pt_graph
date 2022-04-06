import { Component } from 'react';
import './App.css';

/* RESAS APIから情報を取得 */
const apiKey = "KMVXho2JeqwEGj7mmawLCYh20DnKDYlzhyeAqnsK"; // APIキー

/* チェックボックスの生成 */
function CheckboxList(props) {
  const data = props.data;
  const checkboxs = Object.keys(data).map(i => {
    return(
      <li
        key={data[i].prefCode}
        style={{margin: '5px', display: 'inline-block', width: '96px'}}
      >
        <input type="checkbox"/>
        {data[i].prefName}
      </li>
    )
  });

  return(
    <ul>{checkboxs}</ul>
  );
}

class App extends Component{

  constructor(){
    super();
    this.state = {
      prefectures: {},  // 都道府県一覧のjson（{prefCode, prefName}）
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
        <CheckboxList data={prefs}/>
        <div>グラフ</div>
      </div>
    );
  }
}

export default App;
