import React,{ useEffect, useState} from "react";
import { supabase } from "../supabaseClient";

export const StudyRecords = () => {
    const [studyRecords, setStudyRecords] = useState([]);
    const [loading, setLoading] = useState();

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
    if (loading) return <p>Loading....</p>;

    return(
        <>
        <div className="card">
        <ul>
          {studyRecords.map(record => (
            <li key={record.id}>
              <p>
                タイトル：{record.title} 学習時間:{record.time}時間
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>合計学習時間:時間</p>
      </div>
        </>
    )
}