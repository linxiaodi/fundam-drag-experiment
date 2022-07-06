import { fromEvent, merge, takeUntil } from 'rxjs'



export class DropManager {
  constructor(options) {
    const { el, dragManagers, type } = options;
    this.el = el;
    this.dragManagers = dragManagers;
    this.type = type;
    this.mouseover$ = fromEvent(this.el, 'mouseover')
    this.dragOver$ = merge(
      ...this.dragManagers.map((t) => t.mousemove$)
    ).pipe(
      takeUntil(this.mouseover$)
    )
    this.dragOver$.subscribe(() => {
      console.log('dragOver')
    })
  }


}