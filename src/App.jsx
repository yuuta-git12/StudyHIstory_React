import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { supabase } from "./supabaseClient";
import { AddRecordForm } from "./components/AddRecordForm";
import { StudyRecords } from "./components/StudyRecords";

export const App = () => {
  const [studyRecords, setStudyRecords ] = useState([]);

  //データを取得する関数
  const fectchRecords = async() => {
    try{
      const { data,error } = await supabase.from("study-record").select("*");

      if(error){
        console.error("Error supabaseからデータを取得できませんでした:",error);
      }else if(Array.isArray(data)){
        setStudyRecords(data);
      }else{
        console.warn("データ形式に誤りがあります:",data);
      }
    }catch(error){
      console.error("例外が発生しました:",error);
    }
  };

  useEffect(() => {
    fectchRecords();
  },[]); // 初回レンダリング時のみ実行される

  return (
    <SDiv>
      <h1>学習記録管理</h1>
      <AddRecordForm onRecordAdded={fectchRecords}/>
      <StudyRecords studyRecords={studyRecords} onRecordDeleted={fectchRecords}/>
    </SDiv>
  )
}

// スタイリングされたコンテナ
const SDiv = styled.div`
  display: grid; /* グリッドレイアウトの有効化 */
  place-items: center; /* 水平・垂直の中央揃え */
  height: 100vh; /* ビューポート全体の高さ */
`;