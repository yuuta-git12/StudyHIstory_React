import React,{ useEffect, useState} from "react";
import { supabase } from "../supabaseClient";

export const StudyRecords = () => {
    const [studyRecords, setStudyRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fectchUsers = async() =>{
            try{
                const { data, error } = await supabase
                .from('study-record')
                .select('*');

                if(error){
                    console.error('Error fetching users:',error);
                }else{
                  if (Array.isArray(data)) {
                    setStudyRecords(data); // そのまま配列として設定
                  } else {
                    console.warn("Unexpected data format:", data);
                  }
                }

            }catch(error){
                console.error('Unexpected error:',error);
            }finally{
                setLoading(false);
            }
        };
        fectchUsers();
    },[]);

    // レコードを削除するための関数
    const handleDelete = async(id) => {
      try {
          const { error } = await supabase
          .from('study-record')
          .delete()
          .eq("id",id) //指定したidのレコードを削除

          if(error){
              console.error("Error deleting record:", error);
          }else{
              // ローカルの状態を更新してリストを反映
              setStudyRecords(studyRecords.filter(record => record.id !== id));
          }
      }catch(error){
          console.error("Unexpected error:", error);
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