import React from "react";
import { render,screen,fireEvent, waitFor } from "@testing-library/react";
import { App } from "./App";
import "@testing-library/jest-dom";

test('renders the title',()=>{
    render(<App />);
    const titleElemnt = screen.getByText('学習記録管理');
    expect(titleElemnt).toBeInTheDocument();
});

test('adds a new record when the form is submitted', async() => {
    render(<App />);
    
    // フォームの入力フィールドとボタンを取得
    const contentInput = screen.getByPlaceholderText('学習内容');
    const timeInput = screen.getByPlaceholderText('学習時間');
    const addButton = screen.getByText('登録');
    
    // フォームに値を入力
    fireEvent.change(contentInput, { target: { value: 'ReactTesting' } });
    fireEvent.change(timeInput, { target: { value: '2' } });
    
    // 登録ボタンをクリック
    fireEvent.click(addButton);
    
    // 新しい記録が表示されていることを確認
    //　非同期処理が完了するまで待機
    await waitFor(()=>{
        const newRecord = screen.getByText((content) => content.includes("ReactTesting"));
        expect(newRecord).toBeInTheDocument();
    })

  });
  
  test('delete a record when the delete button is clicked',async() => {
    render(<App/>);

    //　レコードが削除されていることを確認
    //　非同期処理が完了するまで待機
    await waitFor(()=>{
        const record = screen.getByText((content) => content.includes("ReactTesting"));
        const deleteButton = screen.getByText('削除');
        fireEvent.click(deleteButton);

        expect(record).not.toBeInTheDocument();    
    })
  });

  test('shows an error when the form is submitted without input', () => {
    render(<App />);
    
    const addButton = screen.getByText('登録');
    
    // 登録ボタンをクリック（入力なし）
    fireEvent.click(addButton);
    
    // エラーメッセージが表示されていることを確認
    const errorMessage = screen.getByText('入力されていない項目があります');
    expect(errorMessage).toBeInTheDocument();
  });
  