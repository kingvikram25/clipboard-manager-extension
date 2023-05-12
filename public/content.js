// first we create our inject script function where we inject our script.

function interInject(filePath, tagData) {
  // tagData is actually our document body
  let tagMYData = document.getElementsByTagName(tagData)[0];
  let scriptTag = document.createElement("script");
  scriptTag.setAttribute("type", "text/javascript");
  scriptTag.setAttribute("src", filePath);
  tagMYData.appendChild(scriptTag);
}

// "web_accessible_resources" came from here  chrome extension getURL.

// eslint-disable-next-line no-undef
interInject(chrome.extension.getURL("inject-script.js"), "body");

// copy data

window.addEventListener("message", function (e) {
  if (
    e.data.type &&
    e.data.type === "from-Page" &&
    // eslint-disable-next-line no-undef
    typeof chrome.app.isInstalled !== "undefined"
  ) {
    let newDate = new Date();

    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage({
      date: `${newDate.getDate()} - ${newDate.getMonth()} - ${newDate.getFullYear()},
        ${newDate.getHours()}
      :${newDate.getMinutes()}`,
      copyData: e.data.copyData,
    });
  }
});
