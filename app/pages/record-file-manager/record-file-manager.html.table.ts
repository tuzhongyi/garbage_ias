import { instanceToPlain } from 'class-transformer'
import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { LocaleCompare } from '../../common/tools/compare-tool/compare.tool'
import { Sort } from '../../common/tools/html-tool/html-table-sort.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { FileInfo } from '../../data-core/models/arm/file/file-info.model'

interface RecordFileManagerTableEvent {
  folder: (item: FileInfo) => void
  play: (item: FileInfo) => void
  download: (item: FileInfo) => void
}

export class RecordFileManagerHtmlTable {
  event = new EventEmitter<RecordFileManagerTableEvent>()

  constructor() {
    this.init()
  }
  table = document.getElementById('table') as HTMLTableElement

  tbody = document.querySelector('#table tbody') as HTMLTableSectionElement
  thead = document.querySelector('#table thead') as HTMLTableSectionElement
  nodata = document.getElementById('nodata') as HTMLDivElement

  private widths = ['auto', '20%', '15%', '20%', '10%']

  private datas: FileInfo[] = []
  private _sort?: Sort

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
    HtmlTool.table.sort(this.thead, (sort) => {
      this._sort = sort
      this.sort(sort)
    })
  }

  private sort(sort: Sort) {
    this.datas = this.datas.sort((a: any, b: any) => {
      if (sort.active === 'IsDirectory') {
        return LocaleCompare.compare(
          a[sort.active],
          b[sort.active],
          sort.direction === 'asc'
        )
      } else {
        if (sort.active === 'FileSize') {
          let a_plain = instanceToPlain(a)
          let b_plain = instanceToPlain(b)

          return LocaleCompare.compare(
            a_plain.FileSize,
            b_plain.FileSize,
            sort.direction === 'asc'
          )
        }

        return (
          LocaleCompare.compare(
            a[sort.active],
            b[sort.active],
            sort.direction === 'asc'
          ) ||
          LocaleCompare.compare(
            a.IsDirectory,
            b.IsDirectory,
            sort.direction === 'asc'
          )
        )
      }
    })
    this.reload()
  }

  private append(item: FileInfo) {
    let items = [
      item.FileName,
      item.ModifiedTime.format('yyyy-MM-dd HH:mm:ss'),
      item.IsDirectory ? '文件夹' : '文件',
      item.IsDirectory ? '' : HtmlTool.set(item.FileSize),
    ]
    let tr = HtmlTool.table.append(
      this.tbody,
      items,
      item.IsDirectory
        ? []
        : [
            {
              inner: '<i class="mdi mdi-video"></i>',
              title: '播放',
              id: item.FileName,
              click: (args) => {
                console.log(args.button.id)
                let item = this.datas.find((x) => x.FileName === args.button.id)
                if (item && !item.IsDirectory) {
                  this.event.emit('play', item)
                }
              },
            },
            {
              inner: '<i class="mdi mdi-download"></i>',
              title: '下载',
              id: item.FileName,
              click: (args) => {
                console.log(args.button.id)
                let item = this.datas.find((x) => x.FileName === args.button.id)
                if (item && !item.IsDirectory) {
                  this.event.emit('download', item)
                }
              },
            },
          ]
    )
    tr.id = item.FileName
    tr.addEventListener('dblclick', (e) => {
      let row = (e.target as HTMLElement).parentElement as HTMLTableRowElement
      let data = this.datas.find((x) => x.FileName === row.id)
      if (data) {
        if (data.IsDirectory) {
          this.event.emit('folder', data)
        } else {
          this.event.emit('play', data)
        }
      }
    })
  }

  get(node: string) {
    return this.datas.find((x) => {
      return x.FileName.split('/').pop() === node
    })
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  reload() {
    this.clear()
    for (let i = 0; i < this.datas.length; i++) {
      this.append(this.datas[i])
    }
  }

  async load(datas: FileInfo[]) {
    this.datas = datas

    if (this.datas.length === 0) {
      this.nodata.style.display = ''
      this.table.style.display = 'none'
    } else {
      this.nodata.style.display = 'none'
      this.table.style.display = ''
    }

    for (let i = 0; i < datas.length; i++) {
      this.append(datas[i])
    }

    if (this._sort) {
      this.sort(this._sort)
    }
  }
}
