import React, {useState} from "react";
import { supabase } from "../supabaseClient";

export const AddRecordForm = ({ onRecordAdded }) => {
    const [formData, setFormData] = useState({title:'',time:''});
    const [showError, setShowError] = useState(false);

    // レコードを登録するための関数
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!formData.title || !formData.time){
            setShowError(true); //エラーを表示
            return;
        }

        const { data, error } = await supabase.from('study-record').insert([formData]);

        if(error){
            console.error('Error adding record:',error);
        }else{
            console.log('レコードが追加されました:',data);
            setFormData({title:'',time:''}); //フォームのリセット
            setShowError(false); //登録成功時にエラーメッセージを非表示にする
            onRecordAdded(); //データ更新を親コンポーネントに通知
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <div className='inputTitleForm'>
                <label htmlFor="studyContents">学習内容：</label>
                <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e)=>setFormData({...formData,title: e.target.value})}
                />
            </div>
            <div className='inputTimeForm'>
                <label htmlFor="studyContents">学習時間：</label>
                <input
                    type="number" 
                    min={1} 
                    value={formData.time}
                    onChange={(e)=>setFormData({...formData,time: e.target.value})}
                />
            </div>
            <button type="submit">登録</button>
            {showError && (
                <p style={{ color: "red" }}>入力されていない項目があります</p>
            )}
        </form>
    )
}