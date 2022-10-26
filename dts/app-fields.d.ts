declare namespace kintone.types {
  interface AppFields {
    単価: kintone.fieldTypes.Number;
    数量: kintone.fieldTypes.Number;
    商品名: kintone.fieldTypes.DropDown;
    会社名: kintone.fieldTypes.SingleLineText;
    金額: kintone.fieldTypes.Calc;
  }
  interface SavedAppFields extends AppFields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
