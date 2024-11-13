export class HTMLInputCheckboxElementTool {
  append<T = string>(
    id: T,
    name: string,
    checked: boolean,
    parent: HTMLElement
  ) {
    let input = document.createElement('input')
    input.type = 'checkbox'
    input.checked = checked
    input.id = `${id}`
    let label = document.createElement('label')
    label.htmlFor = `${id}`
    label.innerText = name
    parent.appendChild(input)
    parent.appendChild(label)
    return input
  }
}
