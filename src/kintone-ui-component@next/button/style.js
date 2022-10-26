export const BUTTON_CSS = `
  kuc-button-1-6-0,
  kuc-button-1-6-0 *,
  kuc-button-1-6-0:lang(en),
  kuc-button-1-6-0:lang(en) * {
    font-family: "HelveticaNeueW02-45Ligh", Arial, "Hiragino Kaku Gothic ProN",
      Meiryo, sans-serif;
  }
  kuc-button-1-6-0:lang(ja),
  kuc-button-1-6-0:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
  kuc-button-1-6-0:lang(zh),
  kuc-button-1-6-0:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti, Hei,
      "Heiti SC", sans-serif;
  }
  kuc-button-1-6-0:lang(zh-TW),
  kuc-button-1-6-0:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-button-1-6-0 {
    display: inline-block;
    vertical-align: top;
  }
  kuc-button-1-6-0[hidden] {
    display: none;
  }
  .kuc-button-1-6-0__button {
    font-size: var(--kuc-button-font-size, 16px);
    width: var(--kuc-button-width, "auto");
    height: var(--kuc-button-height, 48px);
    min-width: 163px;
    padding: 0px 16px;
    user-select: none;
  }
  .kuc-button-1-6-0__button--normal {
    background-color: var(--kuc-button-background-color, #f7f9fa);
    color: var(--kuc-button-text-color, #3498db);
    border: 1px solid #e3e7e8;
    box-shadow: 1px 1px 1px #ffffff inset;
  }
  .kuc-button-1-6-0__button--normal:hover,
  .kuc-button-1-6-0__button--normal:focus-visible,
  .kuc-button-1-6-0__button--normal:active {
    box-shadow: none;
    cursor: pointer;
  }
  .kuc-button-1-6-0__button--normal:hover {
    background-color: var(--kuc-button-background-hover, #c8d6dd);
  }
  .kuc-button-1-6-0__button--normal:focus-visible {
    background-color: var(--kuc-button-background-focus, #c8d6dd);
  }
  .kuc-button-1-6-0__button--normal:active {
    background-color: var(--kuc-button-background-active, #c8d6dd);
  }
  .kuc-button-1-6-0__button--submit {
    background-color: var(--kuc-button-background-color, #3498db);
    color: var(--kuc-button-text-color, #ffffff);
    border: 1px solid #e3e7e8;
  }
  .kuc-button-1-6-0__button--submit:hover,
  .kuc-button-1-6-0__button--submit:focus-visible,
  .kuc-button-1-6-0__button--submit:active {
    cursor: pointer;
  }
  .kuc-button-1-6-0__button--submit:hover {
    background-color: var(--kuc-button-background-hover, #1d6fa5);
  }
  .kuc-button-1-6-0__button--submit:focus-visible {
    background-color: var(--kuc-button-background-focus, #1d6fa5);
  }
  .kuc-button-1-6-0__button--submit:active {
    background-color: var(--kuc-button-background-active, #1d6fa5);
  }
  .kuc-button-1-6-0__button--alert {
    background-color: var(--kuc-button-background-color, #e74c3c);
    color: var(--kuc-button-text-color, #ffffff);
    border: 0 none;
    box-shadow: 1px 1px 1px #ffffff inset;
  }
  .kuc-button-1-6-0__button--alert:hover,
  .kuc-button-1-6-0__button--alert:focus-visible,
  .kuc-button-1-6-0__button--alert:active {
    box-shadow: none;
    cursor: pointer;
  }
  .kuc-button-1-6-0__button--alert:hover {
    background-color: var(--kuc-button-background-hover, #bf2718);
  }
  .kuc-button-1-6-0__button--alert:focus-visible {
    background-color: var(--kuc-button-background-focus, #bf2718);
  }
  .kuc-button-1-6-0__button--alert:active {
    background-color: var(--kuc-button-background-active, #bf2718);
  }
  .kuc-button-1-6-0__button:disabled {
    background-color: var(--kuc-button-background-color, #d4d7d7);
    border: 1px solid #e3e7e8;
    box-shadow: none;
    color: var(--kuc-button-text-color, #888888);
    cursor: default;
  }
  .kuc-button-1-6-0__button--normal:focus-visible,
  .kuc-button-1-6-0__button--submit:focus-visible,
  .kuc-button-1-6-0__button--alert:focus-visible {
    outline: 1px solid #3498db;
  }
`;
