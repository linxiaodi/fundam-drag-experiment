import React, { useState, useTransition } from 'react'

const SliderConCurrent = () => {
  const [value, setValue] = useState(0)
  const [list, setList] = useState([])
  const [isPending, startTransition] = useTransition()

  return (<div>
    <input onChange={(e) => {
        const val = +e.target.value
        console.log(val)
        setValue(val)
        startTransition(() => {
          const v = []
          for (let index = 0; index < val * 100; index++) {
            v.push(index)
          }
          setList(v)
        })
      }}
      value={value}
      type="range"
      min="1"
      max="100"
    />
    <div style={{ height: '100px', overflow: 'auto' }}>
      <p>
        { list.map((i) => <div>{i}</div>) }
      </p>
    </div>
  </div>)
}

export default SliderConCurrent