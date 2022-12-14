export const BASE_DATE_CSS = `
input.kuc-base-date-1-6-0__input {
  width: 100px;
  height: 40px;
  padding: 0px;
  text-align: center;
  border: 1px solid #e3e7e8;
  color: #333333;
  box-sizing: border-box;
  font-size: 14px;
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
}

input.kuc-base-date-1-6-0__input:focus {
  outline: none;
  border: 1px solid #3498db;
}
input.kuc-base-date-1-6-0__input--focus {
  box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
  border: 1px solid #3498db;
  background-color: #ffffff;
  color: #333333;
}
.kuc-datetime-picker-1-6-0__group__inputs--date
  input.kuc-base-date-1-6-0__input--focus {
  border-color: #3498db;
}
input.kuc-base-date-1-6-0__input:disabled {
  color: #888888;
  background-color: #d4d7d7;
  box-shadow: none;
  cursor: not-allowed;
}
.kuc-base-date-1-6-0__calendar {
  position: absolute;
  z-index: 2000;
  background-color: #ffffff;
  text-align: center;
  box-sizing: border-box;
}
.kuc-base-date-1-6-0__assistive-text {
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  position: absolute !important;
  padding: 0px !important;
  border: 0px !important;
  height: 1px !important;
  width: 1px !important;
}
`;
