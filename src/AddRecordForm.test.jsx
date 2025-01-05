import React from "react";
import { render,screen,fireEvent, waitFor } from "@testing-library/react";
import { AddRecordForm } from "./components/AddRecordForm";
import { supabase } from "./supabaseClient";
import "@testing-library/jest-dom";

// モック関数の作成
jest.mock('./supabaseClient', () => ({
    supabase: {
        from: jest.fn().mockReturnValue({
            insert: jest.fn(() => Promise.resolve({ data: [], error: null })),
        }),
    },
}));

test('フォームが不完全な場合、エラーメッセージが表示される',()=>{
    render(<AddRecordForm onRecordAdded={jest.fn()} />);

    fireEvent.click(screen.getByText('登録'));

    //エラーメッセージが表示されているか確認
    expect(screen.getByText('入力されていない項目があります')).toBeInTheDocument();
})

test('フォームが正常に送信され、データが追加される', async()=> {
    const onRecordAdded = jest.fn();
    render(<AddRecordForm onRecordAdded={onRecordAdded} />);

    //　ラベルを使って入力要素にアクセスし、値を設定
    fireEvent.change(screen.getByLabelText('学習内容：'),{ target: {value:'React'}});
    fireEvent.change(screen.getByLabelText('学習時間：'),{ target: {value:'2'}});

    // 登録ボタンをクリック
    fireEvent.click(screen.getByText('登録'));

    // Supabaseにデータが追加されたことを確認
    await waitFor(() => expect(supabase.from('study-record').insert).toHaveBeenCalledWith([
        {title: 'React', 'time':'2'}
    ]));

    //親コンポーネントのコールバックが呼ばれることを確認
    expect(onRecordAdded).toHaveBeenCalled();
});

test('エラーが発生した場合、コンソールにエラーメッセージが表示される', async() => {
    const errorMessage = 'Error adding record';
    supabase.from.mockReturnValueOnce({
        insert: jest.fn().mockResolvedValue({ data: null, error: errorMessage }),
    });
    console.error = jest.fn();

    render(<AddRecordForm onRecordAdded={jest.fn()} />);

    fireEvent.change(screen.getByLabelText('学習内容：'), { target: { value: 'React' } });
    fireEvent.change(screen.getByLabelText('学習時間：'), { target: { value: '2' } });

    fireEvent.click(screen.getByText('登録'));

    await waitFor(() => expect(console.error).toHaveBeenCalledWith('Error adding record:', errorMessage));
});

