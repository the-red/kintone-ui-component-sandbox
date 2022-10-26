export const TABLE_CSS = `
    kuc-table-1-6-0,
    kuc-table-1-6-0 *,
    kuc-table-1-6-0:lang(en),
    kuc-table-1-6-0:lang(en) * {
        font-family: "HelveticaNeueW02-45Ligh", Arial,
        "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
    }
    kuc-table-1-6-0:lang(ja),
    kuc-table-1-6-0:lang(ja) * {
        font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
        sans-serif;
    }
    kuc-table-1-6-0:lang(zh),
    kuc-table-1-6-0:lang(zh) * {
        font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
        Hei, "Heiti SC", sans-serif;
    }
    kuc-table-1-6-0:lang(zh-TW),
    kuc-table-1-6-0:lang(zh-TW) * {
       font-family: "微軟正黑體","Microsoft JhengHei","新宋体",NSimSun,STHeiti,
         Hei,"Heiti SC",sans-serif;
    }
    kuc-table-1-6-0 {
        font-size: 14px;
        color: #333333;
        display: block;
    }
    kuc-table-1-6-0[hidden] {
        display: none;
    }
    kuc-table-1-6-0 kuc-* {
        line-height: 1;
    }
    .kuc-table-1-6-0__table {
        border-collapse: collapse;
    }
    .kuc-table-1-6-0__table__header {
        border-width: 0px 1px;
        border-color: #3498db;
        border-style: solid;
        border-right: 0;
    }
    .kuc-table-1-6-0__table__header__cell {
        box-sizing: border-box;
        font-size: 12px;
        font-weight: 400;
        background-color: #3498db;
        color: #ffffff;
        height: 40px;
        padding: 4px 8px;
        text-align: left;
        white-space: nowrap;
    }
    .kuc-table-1-6-0__table__header__cell[hidden] {
        display: none;
    }
    .kuc-table-1-6-0__table__body__row__cell-data {
        border-color: #e3e7e8;
        border-style: solid;
        border-width: 1px;
        padding: 8px 8px;
        vertical-align: top;
    }
    .kuc-table-1-6-0__table__body__row__cell-data[hidden] {
        display: none;
    }
    .kuc-table-1-6-0__table__body__row__action {
        display: flex;
        vertical-align: top;
    }
    .kuc-table-1-6-0__table__body__row__action button {
        display: flex;
        align-items: center;
        width: 24px;
        height: 24px;
        background: transparent;
        border: 1px solid transparent;
        padding: 2px;
        cursor: pointer;
    }
    .kuc-table-1-6-0__table__body__row__action button[hidden] {
        display: none;
    }
    .kuc-table-1-6-0__table__body__row__action-add {
        margin-left: 12px;
    }
    .kuc-table-1-6-0__table__body__row__action-remove {
        margin-left: 4px;
    }
    .kuc-table-1-6-0__table__body__row__action-add:focus,
    .kuc-table-1-6-0__table__body__row__action-remove:focus {
        border: 1px solid #3498db;
        outline: none;
    }
    .kuc-table-1-6-0__table__body__row__action-remove:hover path {
        fill: #e74c3c;
    }
    .kuc-table-1-6-0__table__body__row__action[hidden] {
        display: none;
    }
    .kuc-table-1-6-0__table caption {
        text-align: left;
        margin-bottom: 6px;
    }
`;
