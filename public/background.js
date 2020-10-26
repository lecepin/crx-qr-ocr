chrome.contextMenus.create({
  title: "生成二维码：“%s”",
  contexts: ["selection"],
  onclick: function (args) {
    window.chrome.tabs.query({ active: true, currentWindow: true }, function (
      tabs
    ) {
      if (!tabs || !tabs[0]) return;
      window.chrome.tabs.sendMessage(tabs[0].id, {
        action: "genQr",
        str: args.selectionText,
      });
    });
  },
});

chrome.contextMenus.create({
  title: "识别图片文字",
  contexts: ["image"],
  onclick: function (args) {
    if (args.srcUrl.indexOf(".gif") >= 0) {
      return;
    }
    window.chrome.tabs.query({ active: true, currentWindow: true }, function (
      tabs
    ) {
      if (!tabs || !tabs[0]) return;
      window.chrome.tabs.sendMessage(tabs[0].id, {
        action: "getOCR",
        img: args.srcUrl,
      });
    });
  },
});

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getOcrInfo") {
    fetch(request.img)
      .then((data) => data.blob())
      .then((blob) => {
        var data = new FormData();
        data.append("img", blob);
        return fetch("https://xxxxx", {
          method: "post",
          body: data,
        })
          .then((data) => data.json())
          .then((data) => {
            if (!data.words_result.length) {
              throw 1;
            }

            window.chrome.tabs.query(
              { active: true, currentWindow: true },
              function (tabs) {
                if (!tabs) return;
                window.chrome.tabs.sendMessage(tabs[0].id, {
                  type: "sendOCR",
                  data: data.words_result.map((item) => item.words).join("\n"),
                });
              }
            );
          });
      })
      .catch((e) => {
        window.chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            if (!tabs) return;
            window.chrome.tabs.sendMessage(tabs[0].id, {
              type: "sendOCR",
              data: "",
            });
          }
        );
      });
  }
});
