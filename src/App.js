import * as React from "react";
import { clipboard } from "@extend-chrome/clipboard";
import "./index.css";
import "./App.css";

function clipboardCon() {
  clipboard.readText().then((text) => {
    // console.log("clipboard", text);
    return text;
  });
}

export default function App() {
  return (
    <>
      <h1>{() => clipboardCon()}</h1>
    </>
  );
}
