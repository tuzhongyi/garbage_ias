import { FileInfo } from '../../data-core/models/arm/file/file-info.model'

export interface RecordFileManagerEvent {
  root(): void
  folder(data: FileInfo): void
  play(data: FileInfo): void
  download(data: FileInfo): void
}
