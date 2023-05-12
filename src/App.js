import * as React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";

// write text in user clipboard if copy is clicked
async function getClipboardContents(e) {
  try {
    await navigator.clipboard.writeText(e);
    console.log("Pasted content: ");
  } catch (err) {
    console.error("Failed to read clipboard contents: ", err);
  }
}

export default function App() {
  const [text, setText] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("allTextCopy"));
    if (items && items.length > 0) {
      setText(items);
    }
  }, []);

  return (
    <>
      <label>
        <input
          id="input-search"
          placeholder="Search Text..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      {text.length > 0 ? (
        <div>
          <button
            className="clearAll"
            onClick={() => {
              localStorage.removeItem("allTextCopy");
              localStorage.setItem("allTextCopy", JSON.stringify([]));
              setText([]);
            }}>
            Clear ClipBoard
          </button>
        </div>
      ) : (
        <p className="empty-clipboard"> Nothing on ClipBoard...</p>
      )}
      {text
        .slice(0)
        .reverse()
        .filter((data) => {
          if (search === "") {
            return data.copyData;
          } else if (
            data.copyData
              .toLowerCase()
              .trim()
              .includes(search.toLowerCase().trim())
          ) {
            return data.copyData;
          }
        })
        .map((e, i) => (
          <div className="flex-copy" key={i}>
            <div className="text-start">{e.copyData.substring(0, 50)}</div>
            <div className="text-start-dt">{e.date}</div>
            <div className="copy-delete">
              <button className="copy" onClick={() => getClipboardContents(e)}>
                Copy
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("allTextCopy");
                  localStorage.setItem(
                    "allTextCopy",
                    JSON.stringify(text.filter((a) => a !== e))
                  );
                  setText(text.filter((a) => a !== e));
                }}
                className="fa-solid">
                <i class="fa-sharp fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
    </>
  );
}
