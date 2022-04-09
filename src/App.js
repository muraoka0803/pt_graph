import { Component } from 'react';
import './App.css';

/* RESAS APIから情報を取得 */
const apiKey = "KMVXho2JeqwEGj7mmawLCYh20DnKDYlzhyeAqnsK"; // APIキー

class App extends Component{

  constructor(){
    super();
    this.state = {
      prefectures: {},                              // 都道府県一覧のjson（{prefCode, prefName}）
      selected: Array(47).fill(false),              // チェックボックスで選択されているかどうか
      populationData: {maxYear:undefined, data:[]}  // 人口数データ（maxYear:表示する年の最大値, data:({prefCode, data)）
    };
    this.CheckboxList = this.CheckboxList.bind(this);
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

  /* チェックボックスの生成 */
  CheckboxList(props) {
    const data = props.data;
    const selected = props.selected;

    // i番目の都道府県のチェックボックス
    const makePrefCheckbox = (i, app) => {
      return(
        <li
          key={data[i].prefCode}
          style={{margin: '5px', display: 'inline-block', width: '96px'}}
        >
          <input
            type="checkbox"
            onChange={() => onChange.bind(this)(i)}
          />
          {data[i].prefName}
        </li>
      );
    }

    // チェックボックスが更新された時の処理
    const onChange = (i) =>{
      const prefName = data[i].prefName;

      selected[i] = !selected[i];
      console.log(prefName+":"+selected[i]);
      
      if(selected[i]){
        // チェックされた時の処理
        // 人口数データの取得
        fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${Number(i)+1}`, {headers: {'X-API-KEY': apiKey}})
        .then(response => response.json())
        .then(res => {
          const data = res.result;
          this.setState((state) => {
            return({
              populationData: {
                maxYear: data.boundaryYear, 
                data: [...this.state.populationData.data, {prefName:prefName, data:data.data[0].data}]
              }
            });
          });
        });
      }else{
        // チェックが外された時の処理
        // 人口数データの消去
        const maxYear = this.state.populationData.maxYear;
        const data = this.state.populationData.data;
        console.log(data);
        let index = 0;
        for(index=0; prefName !== data[index].prefName; index++);
        
        this.setState({
          populationData: {
            maxYear: maxYear,
            data : [...data.slice(0, index), ...data.slice(index+1)]
          }
        });
      }
    }

    const checkboxs = Object.keys(data).map((i) => makePrefCheckbox.bind(this)(i));

    return(
      <ul>{checkboxs}</ul>
    );
  }

  // 都道府県一覧の表示
  displayPref(props){
    return(
      <div key={props.prefCode}>{props.prefName}</div>
    );
  }

  render(){
    const prefs = this.state.prefectures;
    const selected = this.state.selected;
    return (
      <div className="App">
        {/* {Object.keys(prefs).map(i => this.displayPref(prefs[i]))} */}
        <div>Title</div>
        <div>チェックボックス</div>
        <this.CheckboxList data={prefs} selected={selected}/>
        <div>グラフ</div>
      </div>
    );
  }
}

export default App;
