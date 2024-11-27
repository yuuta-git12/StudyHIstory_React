import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {

  const initialRecords = [
    { title: '勉強の記録1', time: 1 },
    { title: '勉強の記録2', time: 3 },
    { title: '勉強の記録3', time: 5 },
  ];

  const [records,setRecords] = useState([]);
  const [title,setTitle] = useState("");
  const [time,setTime] = useState("");
  const [showError, setShowError] = useState(false);

  // テキストフォームに値を入力した場合の処理
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeTime = (e) => {
    setTime(e.target.value);
  }

  const onClickAdd = () => {
    if(title === "" || time === "") {
      setShowError(true); //エラーを表示
      return;
    }
    const newRecords = [...records,{title:title,time:time}];
    setRecords(newRecords);
    setTitle("");
    setTime("");
    setShowError(false); //登録成功時にエラーメッセージを非表示にする
  }

  return (
    <>
      <div></div>
      <h1>「学習記録一覧」</h1>
      <div className='inputTitleForm'>
        <label htmlFor="studyContents">学習内容：</label>
        <input 
          type="text" 
          value={title}
          onChange={onChangeTitle}
        />
      </div>
      <div className='inputTimeForm'>
        <label htmlFor="studyContents">学習時間：</label>
        <input
           type="number" 
           min={1} 
           value={time}
           onChange={onChangeTime}
        />
      </div>
      <div>
        <button onClick={onClickAdd}>登録</button>
      </div>
      {showError && (
        <p style={{ color: "red" }}>入力されていない項目があります</p>
      )}
      <div className="card">
        <ul>
          {records.map((record, index) => (
            <li key={index}>
              <p>
                タイトル：{record.title} 学習時間:{record.time}時間
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
