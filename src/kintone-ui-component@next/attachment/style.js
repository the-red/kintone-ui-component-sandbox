export const ATTACHMENT_CSS = `
  kuc-attachment-1-6-0,
  kuc-attachment-1-6-0 *,
  kuc-attachment-1-6-0:lang(en),
  kuc-attachment-1-6-0:lang(en) * {
    font-family: "HelveticaNeueW02-45Ligh", Arial,
        "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
  kuc-attachment-1-6-0:lang(ja),
  kuc-attachment-1-6-0:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
        sans-serif;
  }
  kuc-attachment-1-6-0:lang(zh),
  kuc-attachment-1-6-0:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
        Hei, "Heiti SC", sans-serif;
  }
  kuc-attachment-1-6-0:lang(zh-TW),
  kuc-attachment-1-6-0:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
        Hei,"Heiti SC",sans-serif;
  }
  kuc-attachment-1-6-0 {
    font-size: 14px;
    display: inline-block;
  }
  kuc-attachment-1-6-0[hidden] {
    display: none;
  }
  .kuc-attachment-1-6-0__group {
    width: auto;
    height: auto;
    box-sizing: border-box;
    position: relative;
  }
  .kuc-attachment-1-6-0__group__label {
    background-color: f5f5f5;
    display: block;
    padding: 4px 8px;
    color: #333333;
    margin: 0 -8px;
    white-space: nowrap;
  }
  .kuc-attachment-1-6-0__group__label[hidden] {
    display: none;
  }
  .kuc-attachment-1-6-0__group__files {
    border: solid 1px #e3e7e8;
    background-color: #eeeeee;
    padding: 16px 8px;
    display: block;
    font-size: 14px;
    overflow: hidden;
    position: relative;
  }
  .kuc-attachment-1-6-0__group__files__browse-button {
    border: 1px solid transparent;
    position: relative;
    display: inline-block;
    margin-right: 16px;
    padding: 8px;
    text-decoration: none;
  }
  .kuc-attachment-1-6-0__group__files__browse-button[hidden]{
    display: none
  }
  .kuc-attachment-1-6-0__group__files__browse-button:focus-within {
    border: 1px solid #3498db;
  }
  .kuc-attachment-1-6-0__group__files__browse-button:hover
  .kuc-attachment-1-6-0__group__files__browse-button__text {
    color: #217dbb;
  }
  .kuc-attachment-1-6-0__group__files__browse-button__text {
    color: #3498db;
    font-size: 14px;
  }
  .kuc-attachment-1-6-0__group__files__browse-button__input-container {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    display: inline-block;
  }
  .kuc-attachment-1-6-0__group__files__browse-button__input-container__input {
    cursor: pointer;
    font-size: 999px;
    vertical-align: middle;
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }
  .kuc-attachment-1-6-0__group__files__display-area {
    padding-inline-start: 0px;
    list-style-type: disc;
    margin-block-start: 0em;
    margin-block-end: 0em;
  }
  .kuc-attachment-1-6-0__group__files__display-area__item {
    position: relative;
    margin-bottom: 8px;
    height: 24px;
    border: 2px solid #f1f4f5;
    background-color: #f1f4f5;
    list-style: none;
  }
  .kuc-attachment-1-6-0__group__files__display-area__item__name {
    display: inline-block;
    padding: 3px 68px 0 26px;
    width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
    font-size: 14px;
  }
  .kuc-attachment-1-6-0__group__files__display-area__item__remove-button__container {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
  }
  .kuc-attachment-1-6-0__group__files__display-area__item__remove-button__container[hidden] {
    display: none;
  }
  .kuc-attachment-1-6-0__group__files__display-area__item__remove-button__container__button
  {
    background-color: #f2f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    padding: 0px;
    width:100%;
    height:100%;
  }
  .kuc-attachment-1-6-0__group__files__display-area__item__remove-button__container__button:hover {
    background: #d8e1e6;
  }
  .kuc-attachment-1-6-0__group__files__display-area__item__remove-button__container__button:focus-within {
    border: 1px solid #3498db;
  }
  .kuc-attachment-1-6-0__group__files__display-area__item__remove-button__container__button:focus {
    outline: none;
  }
  .kuc-attachment-1-6-0__group__files__display-area__item__size {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    color: #888888;
    padding: 3px 3px 0 0;
    max-width: 64px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
    font-size: 14px;
  }
  .kuc-attachment-1-6-0__group__files__droppable {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    margin: auto 0;
  }
  .kuc-attachment-1-6-0__group__files__droppable[hidden] {
    display: none;
  }
  .kuc-attachment-1-6-0__group__files__droppable__text {
    background-color: #e2f2fe;
    border: dashed 2px #3498db;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: #3498db;
    font-size: 14px;
  }
`;
