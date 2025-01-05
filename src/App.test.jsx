import React from "react";
import { render,screen,fireEvent } from "@testing-library/react";
import { App } from "./App";
import "@testing-library/jest-dom";

test('renders the title',()=>{
    render(<App />);
    const titleElemnt = screen.getByText('学習記録管理');
    expect(titleElemnt).toBeInTheDocument();
})