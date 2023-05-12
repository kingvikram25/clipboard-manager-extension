console.log("background script is ready");

// local storage no file then create

if (!localStorage.getItem("allTextCopy")) {
  localStorage.setItem("allTextCopy", JSON.stringify([]));
}

// set localStorage Function for update our popUp

function updateToLc(textAdd) {
  let currentArray = JSON.parse(localStorage.getItem("allTextCopy"));
  currentArray.push(textAdd);

  currentArray = currentArray.filter((obj, index) => {
    return (
      index ===
      currentArray.findIndex((o) => obj.copyData.trim() === o.copyData.trim())
    );
  });

  localStorage.removeItem("allTextCopy");
  localStorage.setItem("allTextCopy", JSON.stringify(currentArray));

  console.log("event sent to pop-up");
}

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  updateToLc({ copyData: message.copyData, date: message.date });
});
