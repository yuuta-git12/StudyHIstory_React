import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const records = [
    { title: '勉強の記録1', time: 1 },
    { title: '勉強の記録2', time: 3 },
    { title: '勉強の記録3', time: 5 },
  ];

  return (
    <>
      <div></div>
      <h1>「学習記録一覧」</h1>
      <div className='inputTitleForm'>
        <label htmlFor="studyContents">学習内容：</label>
        <input type="text"/>
      </div>
      <div className='inputTimeForm'>
        <label htmlFor="studyContents">学習時間：</label>
        <input type="number" min={1}/>
      </div>
      <div className="card">
        <ul>
          {records.map((record, index) => (
            <li key={index}>
              <p>
                タイトル：{record.title} 時間:{record.time}時間
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
