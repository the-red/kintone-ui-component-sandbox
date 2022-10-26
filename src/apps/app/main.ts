import { Dropdown, Table } from 'kintone-ui-component@next'
import type { IndexEvent } from 'types'

const renderLink = (recordId: number) => {
  const element = document.createElement('p')
  element.innerHTML = `<a href="/k/4771/show#record=${recordId}">📄</a>`
  return element
}
const renderItem = (cellData: string) => {
  const dropdown = new Dropdown({
    items: [
      { label: 'コーラ', value: 'コーラ' },
      { label: 'メロンソーダ', value: 'メロンソーダ' },
      { label: 'コーヒー', value: 'コーヒー' },
    ],
    value: cellData,
    selectedIndex: 0,
  })
  return dropdown
}

kintone.events.on('app.record.index.show', async (event: IndexEvent<kintone.types.SavedAppFields>) => {
  const records = event.records

  const table = new Table({
    id: 'customize-view-table',
    label: 'kintone UI Componentで作ったカスタマイズビューでございまーす！',
    actionButton: false,
    columns: [
      {
        title: '',
        field: 'link',
        render: renderLink,
      },
      {
        title: '会社名',
        field: '会社名',
      },
      {
        title: '商品名',
        field: '商品名',
        render: renderItem,
      },
      {
        title: '単価',
        field: '単価',
      },
      {
        title: '数量',
        field: '数量',
      },
      {
        title: '金額',
        field: '金額',
      },
    ],
    data: records.map((record) => ({
      link: record.$id.value,
      会社名: record.会社名.value,
      商品名: record.商品名.value,
      単価: record.単価.value,
      数量: record.数量.value,
      金額: record.金額.value,
    })),
  })

  const space = document.querySelector<HTMLDivElement>('#customize-view')!
  space.style.padding = '1rem'
  const currentTable = document.querySelector('#customize-view-table')
  if (currentTable) {
    space.removeChild(currentTable)
  }
  space.appendChild(table)

  return event
})
