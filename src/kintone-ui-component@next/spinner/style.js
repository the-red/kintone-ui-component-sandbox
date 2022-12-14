export const SPINNER_CSS = `
  kuc-spinner-1-6-0,
  kuc-spinner-1-6-0 *,
  kuc-spinner-1-6-0:lang(en),
  kuc-spinner-1-6-0:lang(en) * {
    font-family: "HelveticaNeueW02-45Ligh", Arial,
      "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
  kuc-spinner-1-6-0:lang(ja),
  kuc-spinner-1-6-0:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-spinner-1-6-0:lang(zh),
  kuc-spinner-1-6-0:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-spinner-1-6-0:lang(zh-TW),
  kuc-spinner-1-6-0:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-spinner-1-6-0 {
    font-size: 14px;
    color: #333333;
  }
  .kuc-spinner-1-6-0__spinner {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .kuc-spinner-1-6-0__spinner__loader {
    width: 50px;
    height: 50px;
    animation: rotate-loading 1s steps(12) infinite;
    fill: #99ccff;
  }
  .kuc-spinner-1-6-0__spinner__text {
    margin: 10px 0;
  }
  .visually-hidden {
    position: absolute;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    overflow: hidden;
    border: 0;
    padding: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    margin: -1px;
  }
  .kuc-spinner-1-6-0__mask {
    position: fixed;
    top: 0;
    right: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #666666;
    opacity: 0.6;
    z-index: 9999;
  }
  .kuc--has-spinner {
    overflow: hidden;
  }
  @keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
