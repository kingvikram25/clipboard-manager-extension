console.log("here our injected function run");

window.addEventListener("copy", (event) => {
  let selectionTextData = document.getSelection();
  window.postMessage({
    type: "from-Page",
    copyData: selectionTextData.toString(),
    date: new Date(),
  });
});
