/**
 * 
 * const { dragRef } = useDrag()
 * const { dropRef } = useDrop()
 * 
 * <div ref={dragRef}>drag</div>
 * <div ref={dropRef}>drop</div>
 * 
 * options = {
 *  dragStart() {
 *  },
 *  dragMove() {
 *  },
 *  onDrop() {
 *  },
 *  onCancel() {},
 *  dragSource: {}
 * }
 * 
 * dispatchEvent()
*/
import { fromEvent, observable, switchMap, takeUntil, map, last } from 'rxjs'

const ghostEl = document.createElement('div')
ghostEl.setAttribute('id', 'ghost')
ghostEl.innerText = 'shadow'
ghostEl.setAttribute('style', 'position: absolute;display: none; width: 30px; height: 16px;')
document.body.appendChild(ghostEl)

export class DragManager {
  constructor(options) {
    this._options = options;
    this.el = options.el;
    this.mousedown$ = fromEvent(this.el, 'mousedown')
    this.mouseup$ = fromEvent(document, 'mouseup')
    this.mousemove$ = fromEvent(document, 'mousemove')

    this.dragStart$ = this.mousedown$
    this.dragMove$ = this.dragStart$.pipe(
      switchMap(
        (startEvent) => this.mousemove$.pipe(
          map(moveEvent => {
            return {
              originStartEvent: startEvent,
              originEvent: moveEvent,
              deltaX: moveEvent.pageX - startEvent.pageX,
              deltaY: moveEvent.pageY - startEvent.pageY,
              startOffsetX: startEvent.offsetX,
              startOffsetY: startEvent.offsetY
            }
          }),
          takeUntil(this.mouseup$)
        )
      )
    )
    this.dragEnd$ = this.dragStart$.pipe(
      switchMap(
        () => this.mousemove$.pipe(
          takeUntil(this.mouseup$),
          last(),
        )
      )
    )
    this.init();
  }

  setElStyleAttribute(styles) {
    const el = ghostEl
    const stylesStr = Object.entries(styles).reduce((collection, [key, value]) => {
        return collection + `${key}:${value};`
    }, '')
    el.setAttribute('style', stylesStr)
  }

  init() {
    const { dragStart, dragMove } = this._options;
    this.dragMoveSubscribe = this.dragMove$.subscribe(({ startOffsetX, startOffsetY, originEvent, deltaX, deltaY }) => {
      const styles = {
        position: 'absolute',
        top: (originEvent.y) + 'px',
        left: (originEvent.x) + 'px',
        display: 'block'
      }
      this.setElStyleAttribute(styles)
    })
    this.dragEndSubscribe = this.dragEnd$.subscribe((e) => {
      this.clearEffect()
    })

    this.dragStart$.subscribe(dragStart)
    this.dragMove$.subscribe(dragMove)
  }
  clearEffect() {
    this.setElStyleAttribute({
      display: 'none'
    })
  }
}