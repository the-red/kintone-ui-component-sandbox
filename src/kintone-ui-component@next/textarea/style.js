export const TEXTAREA_CSS = `
  kuc-textarea-1-6-0,
  kuc-textarea-1-6-0 *,
  kuc-textarea-1-6-0:lang(en),
  kuc-textarea-1-6-0:lang(en) * {
    font-family: "HelveticaNeueW02-45Ligh", Arial,
      "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
  kuc-textarea-1-6-0:lang(ja),
  kuc-textarea-1-6-0:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-textarea-1-6-0:lang(zh),
  kuc-textarea-1-6-0:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-textarea-1-6-0:lang(zh-TW),
  kuc-textarea-1-6-0:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-textarea-1-6-0 {
    font-size: 14px;
    color: #333333;
    display: inline-table;
    vertical-align: top;
    width: 299px;
    line-height: 1.5;
  }
  kuc-textarea-1-6-0[hidden] {
    display: none;
  }
  .kuc-textarea-1-6-0__group {
    border: none;
    padding: 0px;
    height: auto;
    display: inline-block;
    vertical-align: top;
    width: 100%;
    margin: 0px;
  }
  .kuc-textarea-1-6-0__group__label {
    white-space: nowrap;
    display: inline-block;
    padding: 4px 0px 8px 0px;
  }
  .kuc-textarea-1-6-0__group__label[hidden] {
    display: none;
  }
  textarea.kuc-textarea-1-6-0__group__textarea {
    display: block;
    border: 1px solid #e3e7e8;
    box-sizing: border-box;
    font-size: 14px;
    box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
    min-width: 299px;
    min-height: 125px;
    padding: 8px;
    resize: none;
    width: 100%;
    background-color: #ffffff;
  }
  .kuc-textarea-1-6-0__group__textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
    border: 1px solid #3498db;
    background-color: #ffffff;
    color: #333333;
  }
  .kuc-textarea-1-6-0__group__textarea:disabled {
    color: #888888;
    background-color: #d4d7d7;
    box-shadow: none;
    cursor: not-allowed;
    resize: none;
  }
  .kuc-textarea-1-6-0__group__resizer {
    position: relative;
    width: 16px;
    height: 16px;
    cursor: se-resize;
    float: right;
    margin: -16px 0px;
  }
`;
