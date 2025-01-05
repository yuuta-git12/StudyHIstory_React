import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import { Button } from "./components/Button";
import "@testing-library/jest-dom";

test('renders the button with the correct label',() => {
    render(<Button label="Click me" onClick={()=>{}} />);

    //ボタンが正しくレンダリングされているかを確認
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
})

test('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn(); //モック関数を作成(ボタンクリック時に実行する仮の関数)
    render(<Button label="Click me" onClick={handleClick} />);

    const buttonElement = screen.getByText('Click me');

    //ボタンをクリック
    fireEvent.click(buttonElement);

    //モック関数が１回呼び出されたことを確認
    expect(handleClick).toHaveBeenCalledTimes(1);

})