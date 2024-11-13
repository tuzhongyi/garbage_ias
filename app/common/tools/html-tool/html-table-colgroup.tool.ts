export class HTMLTableElementColgroupTool {
  append(table: HTMLTableElement, widths: (string | undefined)[] = []) {
    let colgroup = document.createElement('colgroup')
    for (let i = 0; i < widths.length; i++) {
      const width = widths[i]
      let col = document.createElement('col')
      col.style.width = width ?? ''
      colgroup.appendChild(col)
    }
    table.appendChild(colgroup)
  }
}
