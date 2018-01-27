import React from 'react'
import Kurssi from './komponentit/kurssi'

const App = ({kurssit}) => {
  return (
    <div>
      {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi}/>)}
    </div>
  )
}

export default App