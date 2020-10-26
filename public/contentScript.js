var qrBox;
var qrBoxDiv;
var qrBoxImg;
var qrIns;
var ocrBoxDiv;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if ((request.action = "genQr" && request.str)) {
    if (!qrBox) {
      qrBox = document.createElement("div");

      qrBox.style.cssText = `position: fixed;
        display: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.2);`;

      qrBox.addEventListener("click", () => {
        qrBox.style.display = "none";
        qrBox.innerHTML = "";
        qrBoxDiv = qrIns = null;
      });

      document.body.appendChild(qrBox);
    }

    qrBoxDiv = document.createElement("div");
    qrBoxDiv.style.cssText = `position: absolute;  
    top: 50%;
    left: 50%;
    background: #fff;
    width: 250px;
    height: 250px;
    padding: 10px;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 13px #333;
    border-radius: 5px;
    box-sizing: content-box;!important`;

    qrBox.appendChild(qrBoxDiv);
    try {
      qrIns = new ___lp_QRCode(qrBoxDiv, {
        text: request.str,
        correctLevel: 1,
        width: 250,
        height: 250,
      });
      qrBox.style.display = "block";
    } catch (error) {}
  }
  return true;
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if ((request.action = "getOCR" && request.img)) {
    if (!qrBox) {
      qrBox = document.createElement("div");
      var _style = document.createElement("style");

      _style.type = "text/css";
      _style.innerHTML = `@keyframes ___qr_box_animate{
        0%{-webkit-transform:rotate(0deg);}
        25%{-webkit-transform:rotate(90deg);}
        50%{-webkit-transform:rotate(180deg);}
        75%{-webkit-transform:rotate(270deg);}
        100%{-webkit-transform:rotate(360deg);}
      }`;

      qrBox.style.cssText = `position: fixed;
        display: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.2);`;

      qrBox.addEventListener("click", () => {
        qrBox.style.display = "none";
        qrBox.innerHTML = "";
        ocrBoxDiv = qrBoxDiv = qrIns = null;
      });

      document.body.appendChild(qrBox);
      document.getElementsByTagName("head")[0].appendChild(_style);
    }

    ocrBoxDiv = document.createElement("div");
    ocrBoxDiv.style.cssText = `position: absolute;  
      top: 50%;
      left: 50%;
      background: #fff;
      width: 500px;
      height: 350px;
      padding: 10px;
      transform: translate(-50%, -50%);
      box-shadow: 0px 0px 13px #333;
      border-radius: 5px;
      text-align: center;`;
    ocrBoxDiv.innerHTML = `<img style="animation: ___qr_box_animate 1s linear infinite;background:none;width:350px!important;height:350px!important;"  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHBhdGggaWQ9InN2Z18xIiBkPSJtMjAuMjAxLDUuMTY5Yy04LjI1NCwwIC0xNC45NDYsNi42OTIgLTE0Ljk0NiwxNC45NDZjMCw4LjI1NSA2LjY5MiwxNC45NDYgMTQuOTQ2LDE0Ljk0NnMxNC45NDYsLTYuNjkxIDE0Ljk0NiwtMTQuOTQ2Yy0wLjAwMSwtOC4yNTQgLTYuNjkyLC0xNC45NDYgLTE0Ljk0NiwtMTQuOTQ2em0wLDI2LjU4Yy02LjQyNSwwIC0xMS42MzQsLTUuMjA4IC0xMS42MzQsLTExLjYzNGMwLC02LjQyNSA1LjIwOSwtMTEuNjM0IDExLjYzNCwtMTEuNjM0YzYuNDI1LDAgMTEuNjMzLDUuMjA5IDExLjYzMywxMS42MzRjMCw2LjQyNiAtNS4yMDgsMTEuNjM0IC0xMS42MzMsMTEuNjM0eiIgZmlsbD0iIzMzMyIgb3BhY2l0eT0iMC4yIi8+CiAgPHBhdGggaWQ9InN2Z18yIiB0cmFuc2Zvcm09InJvdGF0ZSg0Mi4xMTcwOTk3NjE5NjI4OSAyMC4wMDAwMDAwMDAwMDAwMSwxOS45OTk5OTk5OTk5OTk5OTYpICIgZD0ibTI2LjAxMywxMC4wNDdsMS42NTQsLTIuODY2Yy0yLjE5OCwtMS4yNzIgLTQuNzQzLC0yLjAxMiAtNy40NjYsLTIuMDEybDAsMGwwLDMuMzEybDAsMGMyLjExOSwwIDQuMSwwLjU3NiA1LjgxMiwxLjU2NnoiIGZpbGw9IiMzMzMiLz4KIDwvZz4KPC9zdmc+" />`;
    ocrBoxDiv.onclick = function (e) {
      e.stopPropagation();
    };

    chrome.runtime.sendMessage({ action: "getOcrInfo", img: request.img });

    qrBox.appendChild(ocrBoxDiv);
    qrBox.style.display = "block";
  }
  return true;
});

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.type == "sendOCR") {
    var response = request.data;

    if (response) {
      ocrBoxDiv.innerHTML = `<textarea style="outline:none;color:#000;width:100%!important;height:100%!important;padding:10px!important;margin:0!important;box-sizing: border-box!important;font-size: 12px!important;line-height: 1.5!important;">${response}</textarea>`;
    } else {
      qrBox.style.display = "none";
      qrBox.innerHTML = "";
    }
  }
});
