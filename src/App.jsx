import { useEffect } from 'react'
import { useState, useId, useTransition, useDebugValue, useDeferredValue, useInsertionEffect, useSyncExternalStore, useRef } from 'react'
import './App.css'

import { DragManager } from './FileOperator/DragManager'
import { DropManager } from './FileOperator/DropManager'


const file = [
  {
    type: 'dir',
    name: '新建文件夹',
    children: []
  },
  {

  }
]


function App() {
  const drag = useRef(null)
  const drag2 = useRef(null)
  const drop = useRef(null)
  useEffect(() => {
    console.log(drag.current)
    const d = new DragManager({
      el: drag.current,
      dragStart: () => {
        console.log('dragStart')
      },
      dragMove() {
        console.log('dragMove')
      }
    })

    new DropManager({
      el: drop.current,
      dragManagers: [d]
    })
  }, [])
  
  return (
    <div className="App">
      <div className="drop">
        <div className='drag-item' ref={drag}></div>
        <div className='drag-item drag2' ref={drag2}></div>
      </div>

      <div ref={drop} className='drop-over' style={{ width: 100, height: 100, background: '#333' }}></div>
    </div>
  )
}

export default App
