import { Dropdown, Table } from 'kintone-ui-component@next'
import type { IndexEvent } from 'types'

const renderLink = (recordId: number) => {
  const element = document.createElement('p')
  element.innerHTML = `<a href="/k/${kintone.app.getId()}/show#record=${recordId}">ð</a>`
  return element
}
const renderItem = (cellData: string) => {
  const dropdown = new Dropdown({
    items: [
      { label: 'ã³ã¼ã©', value: 'ã³ã¼ã©' },
      { label: 'ã¡ã­ã³ã½ã¼ã', value: 'ã¡ã­ã³ã½ã¼ã' },
      { label: 'ã³ã¼ãã¼', value: 'ã³ã¼ãã¼' },
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
    label: 'kintone UI Componentã§ä½ã£ãã«ã¹ã¿ãã¤ãºãã¥ã¼ã§ãããã¾ã¼ãï¼',
    actionButton: false,
    columns: [
      {
        title: '',
        field: 'link',
        render: renderLink,
      },
      {
        title: 'ä¼ç¤¾å',
        field: 'ä¼ç¤¾å',
      },
      {
        title: 'ååå',
        field: 'ååå',
        render: renderItem,
      },
      {
        title: 'åä¾¡',
        field: 'åä¾¡',
      },
      {
        title: 'æ°é',
        field: 'æ°é',
      },
      {
        title: 'éé¡',
        field: 'éé¡',
      },
    ],
    data: records.map((record) => ({
      link: record.$id.value,
      ä¼ç¤¾å: record.ä¼ç¤¾å.value,
      ååå: record.ååå.value,
      åä¾¡: record.åä¾¡.value,
      æ°é: record.æ°é.value,
      éé¡: record.éé¡.value,
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
