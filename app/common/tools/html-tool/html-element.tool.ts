import { ClassConstructor } from 'class-transformer'

export class HtmlElementTool {
  findelement<T extends HTMLElement>(
    e: HTMLElement | null,
    cls: ClassConstructor<T>
  ): T | null
  findelement(e: HTMLElement | null, classname: string): HTMLElement | null

  findelement<T extends HTMLElement>(
    e: HTMLElement | null,
    cls: ClassConstructor<T> | string
  ): T | HTMLElement | null {
    if (typeof cls === 'string') {
      return this.findelementformclassname(e, cls)
    } else {
      return this.findelementfromclass(e, cls)
    }
  }

  private findelementfromclass<T extends HTMLElement>(
    e: HTMLElement | null,
    cls: ClassConstructor<T>
  ): T | null {
    if (!e) return null
    if (e instanceof cls) {
      return e
    }
    return this.findelementfromclass(e.parentElement, cls)
  }

  private findelementformclassname(
    e: HTMLElement | null,
    classname: string
  ): HTMLElement | null {
    if (!e) return null
    if (e.classList.contains(classname)) {
      return e
    }
    return this.findelementformclassname(e.parentElement, classname)
  }
}
