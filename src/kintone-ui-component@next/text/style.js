export const TEXT_CSS = `
kuc-text-1-6-0,
kuc-text-1-6-0 *,
kuc-text-1-6-0:lang(en),
kuc-text-1-6-0:lang(en) * {
  font-family: "HelveticaNeueW02-45Ligh", Arial,
    "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
}
kuc-text-1-6-0:lang(ja),
kuc-text-1-6-0:lang(ja) * {
  font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
    sans-serif;
}
kuc-text-1-6-0:lang(zh),
kuc-text-1-6-0:lang(zh) * {
  font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
    Hei, "Heiti SC", sans-serif;
}
kuc-text-1-6-0:lang(zh-TW),
kuc-text-1-6-0:lang(zh-TW) * {
  font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
    Hei,"Heiti SC",sans-serif;
}
kuc-text-1-6-0 {
  font-size: 14px;
  color: #333333;
  display: inline-table;
  vertical-align: top;
  min-width: 177px;
  width: 177px;
  line-height: 1.5;
}
kuc-text-1-6-0[hidden] {
  display: none;
}
.kuc-text-1-6-0__group {
  border: none;
  padding: 0px;
  height: auto;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  margin: 0px;
}
.kuc-text-1-6-0__group__label {
  display: inline-block;
  padding: 4px 0px 8px 0px;
  white-space: nowrap;
}
.kuc-text-1-6-0__group__label[hidden] {
  display: none;
}
.kuc-text-1-6-0__group__input-form {
  display: table;
  width: 100%;
}
.kuc-text-1-6-0__group__input-form__prefix-outer,
.kuc-text-1-6-0__group__input-form__input-outer,
.kuc-text-1-6-0__group__input-form__suffix-outer {
  display: table-cell;
}
.kuc-text-1-6-0__group__input-form__prefix-outer__prefix {
  padding-right: 4px;
  white-space: nowrap;
}
.kuc-text-1-6-0__group__input-form__input-outer {
  min-width: 26px;
  width: 100%;
}
input[type="text"].kuc-text-1-6-0__group__input-form__input-outer__input {
  width: var(--kuc-text-input-width, 100%);
  height: var(--kuc-text-input-height, 40px);
  font-size: var(--kuc-text-input-font-size, 14px);
  color: var(--kuc-text-input-color, #000000);
  min-width: 100%;
  padding: 0 8px;
  border: 1px solid #e3e7e8;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
}
.kuc-text-1-6-0__group__input-form__input-outer__input[textAlign="left"] {
  text-align: left;
}
.kuc-text-1-6-0__group__input-form__input-outer__input[textAlign="right"] {
  text-align: right;
}
.kuc-text-1-6-0__group__input-form__input-outer__input:focus {
  outline: none;
  border: 1px solid #3498db;
}
.kuc-text-1-6-0__group__input-form__input-outer__input:disabled {
  color: #888888;
  background-color: #d4d7d7;
  box-shadow: none;
  cursor: not-allowed;
}
.kuc-text-1-6-0__group__input-form__suffix-outer__suffix {
  padding-left: 4px;
  white-space: nowrap;
}
`;
