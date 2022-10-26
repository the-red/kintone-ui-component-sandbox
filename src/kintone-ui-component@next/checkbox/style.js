export const CHECKBOX_CSS = `
  kuc-checkbox-1-6-0,
  kuc-checkbox-1-6-0 *,
  kuc-checkbox-1-6-0:lang(en),
  kuc-checkbox-1-6-0:lang(en) * {
    font-family: "HelveticaNeueW02-45Ligh", Arial,
      "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
  kuc-checkbox-1-6-0:lang(ja),
  kuc-checkbox-1-6-0:lang(ja) * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  kuc-checkbox-1-6-0:lang(zh),
  kuc-checkbox-1-6-0:lang(zh) * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-checkbox-1-6-0:lang(zh-TW),
  kuc-checkbox-1-6-0:lang(zh-TW) * {
    font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
      Hei,"Heiti SC",sans-serif;
  }
  kuc-checkbox-1-6-0 {
    font-size: 14px;
    color: #333333;
    display: inline-table;
    vertical-align: top;
    width: 239px;
    min-width: 239px;
   line-height: 1.5;
  }
  kuc-checkbox-1-6-0[hidden] {
    display: none;
  }
  .kuc-checkbox-1-6-0__group {
    border: none;
    padding: 0px;
    height: auto;
    display: inline-block;
    width: 100%;
    margin: 0px;
  }
  .kuc-checkbox-1-6-0__group__select-menu {
    white-space: nowrap;
  }
  .kuc-checkbox-1-6-0__group__label {
    display: inline-block;
    padding: 4px 0 8px 0;
    white-space: nowrap;
  }
  .kuc-checkbox-1-6-0__group__label[hidden] {
    display: none;
  }
  .kuc-checkbox-1-6-0__group__select-menu[borderVisible] {
    border-color: #e3e7e8;
    border-width: 1px;
    border-style: solid;
    padding: 4px 0 0 4px;
  }
  .kuc-checkbox-1-6-0__group__select-menu__item {
    margin-bottom: 4px;
    margin-right: 16px;
    padding: 4px;
    border: 1px solid transparent;
    position: relative;
    white-space: normal;
    word-wrap: normal;
    display: inline-block;
    height: 24px;
    line-height: 24px;
  }
  .kuc-checkbox-1-6-0__group__select-menu__item[itemLayout="vertical"] {
    display: block;
  }
  .kuc-checkbox-1-6-0__group__select-menu__item[focused] {
    border: 1px solid #3498db;
  }
  .kuc-checkbox-1-6-0__group__select-menu__item__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .kuc-checkbox-1-6-0__group__select-menu__item__input:hover
    + .kuc-checkbox-1-6-0__group__select-menu__item__label {
    color: #666666;
  }
  .kuc-checkbox-1-6-0__group__select-menu__item__label__icon {
    position: absolute;
    top: 50%;
    left: -30px;
    box-sizing: border-box;
    margin-top: -11px;
    width: 21px;
    height: 21px;
    box-shadow: 1px 1px 3px #f5f5f5 inset, -1px -1px 3px #f5f5f5 inset;
    content: "";
  }
  .kuc-checkbox-1-6-0__group__select-menu__item__input[disabled]
    + .kuc-checkbox-1-6-0__group__select-menu__item__label {
    color: #888888;
    cursor: not-allowed;
  }
  .kuc-checkbox-1-6-0__group__select-menu__item__label {
    cursor: pointer;
    position: relative;
    margin-left: 32px;
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
  }`;
