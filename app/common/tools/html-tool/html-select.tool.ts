import { IIdNameModel } from '../../../data-core/models/model.interface'

export class HTMLSelectElementTool {
  append<T>(
    model: IIdNameModel<T>,
    parent: HTMLSelectElement | HTMLOptGroupElement
  ) {
    let option = document.createElement('option')
    option.innerHTML = model.Name
    option.value = `${model.Id}`
    parent.appendChild(option)
  }

  optgroup(label: string, parent: HTMLSelectElement) {
    let optgroup = document.createElement('optgroup')
    optgroup.label = label
    parent.appendChild(optgroup)
    return optgroup
  }
}
