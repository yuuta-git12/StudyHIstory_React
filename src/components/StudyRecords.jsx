import React,{ useEffect, useState} from "react";
import { supabase } from "../supabaseClient";

export const StudyRecords = ({ studyRecords,onRecordDeleted }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // 初回データ取得時のローディング制御
      const fetchData = async () => {
          try {
              setLoading(true); // ローディング開始
              const { data, error } = await supabase.from("study-record").select("*");

              if (error) {
                  console.error("Error fetching records:", error);
              } else if (Array.isArray(data)) {
                  setStudyRecords(data); // データのセット
              } else {
                  console.warn("Unexpected data format:", data);
              }
          } catch (error) {
              console.error("Unexpected error:", error);
          } finally {
              setLoading(false); // ローディング終了
          }
      };

      fetchData();
  }, [onRecordDeleted]); //onRecordDeletedの値が変化するたびにuseEffectが実行される
    
    // レコードを削除するための関数
    const handleDelete = async(id) => {
      try {
          setLoading(true); 
          const { error } = await supabase
          .from('study-record')
          .delete()
          .eq("id",id) //指定したidのレコードを削除

          if(error){
              console.error("Error deleting record:", error);
          }else{
              console.log("レコードが削除されました");
              onRecordDeleted(); //データ更新を親コンポーネントに通知
          }
      }catch(error){
          console.error("Unexpected error:", error);
      }finally{
        setLoading(false);
      }
      
    };

    // 合計学習時間の計算
    const totalStudyTime = studyRecords.reduce((sum, record) => sum + (parseInt(record.time, 10) || 0), 0);

    if (loading) return <p>Loading....</p>;

    return(
        <>
        <div className="card">
        <ul>
          {studyRecords.map(record => (
            <li key={record.id}>
              <p>
                タイトル：{record.title} 学習時間:{record.time}時間
                <button onClick={()=>handleDelete(record.id)}>削除</button>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>合計学習時間:{totalStudyTime}時間</p>
      </div>
        </>
    )
}