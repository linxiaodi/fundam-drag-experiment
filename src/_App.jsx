import { useState, useId, useTransition, useDebugValue, useDeferredValue, useInsertionEffect, useSyncExternalStore } from 'react'
import SliderConCurrent from './SliderConCurrent'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState([])

  const query = useDeferredValue(count)

  console.log('count value: ', count)

  console.log('defer value: ', query)

  console.log('rerender', count, count2)

  return (
    <div className="App">
      <header className="App-header">
        <SliderConCurrent></SliderConCurrent>
        <p onClick={async () => {
          await Promise.resolve(1)
          setCount(count+ 1)
          setCount2(count2 + 1)
        }}>async add count</p>
        <p>
          status: { isPending ? 'loading' : 'success' }
          <button type="button" onClick={() => {
            for (let i = 0; i < 3000; i++) {
              setItems((items) => items.concat(i))
            }
            startTransition(() => {
              setCount((count) => count + 1)
            })
          }}>
            count is: {count} {count2}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          { items.map((i) => <div>{i}</div>) }
        </p>
      </header>
    </div>
  )
}

export default App
