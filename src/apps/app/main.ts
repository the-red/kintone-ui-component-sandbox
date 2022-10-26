import { Dropdown, Table } from 'kintone-ui-component@next'
import type { DetailEvent } from 'types'

kintone.events.on(['app.record.detail.show'], async (event: DetailEvent<any /* kintone.types.SavedXxxxFields */>) => {
  const body = kintone.app.record.getSpaceElement('space')!
  const renderAge = (dataCell: any, dataRow: any) => {
    const element = document.createElement('h3')
    element.innerText = `The age is ${dataCell}`
    return element
  }
  const renderName = (cellData: any) => {
    const dropdown = new Dropdown({
      //  items: [...],
      value: cellData,
      selectedIndex: 0,
    })
    return dropdown
  }

  const table = new Table({
    columns: [
      {
        title: 'Name',
        field: 'name',
        render: renderName,
      },
      {
        title: 'Address',
        field: 'address',
      },
      {
        title: 'Age',
        field: 'age',
        render: renderAge,
      },
    ],
    data: [
      {
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        name: 'voduchau',
        age: 20,
        address: 'New York No. 1 Lake Park',
      },
    ],
    label: 'Editable Table',
  })
  body.appendChild(table)

  return event
})
