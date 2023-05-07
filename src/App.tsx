import React from "react";
import { Header } from "./components/header/header";
import "./App.css";
import { TextBody } from "./components/textbody/textBody";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 my-10 flex flex-col justify-start">
        <TextBody />
      </div>
    </div>
  );
}

export default App;
