import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }

    return (
        <div>
        <Otsikko otsake={kurssi.nimi}/>
        <p>Osa 1: <Sisalto  nimi={kurssi.osat[0].nimi} tehtavia={kurssi.osat[0].tehtavia}/></p>
        <p>Osa 2: <Sisalto  nimi={kurssi.osat[1].nimi} tehtavia={kurssi.osat[1].tehtavia}/></p>
        <p>Osa 3: <Sisalto  nimi={kurssi.osat[2].nimi} tehtavia={kurssi.osat[2].tehtavia}/></p>
        <Yhteensa maara={kurssi}/>
        </div>
    )
}

const Sisalto = (kurssi)=>{
    return ( 
            <p> {kurssi.nimi}, tehtäviä {kurssi.tehtavia}</p>
    )
}

const Yhteensa =(kurssi)=>{
    return (
        <p>Yhteensä: {kurssi.maara.osat[0].tehtavia+kurssi.maara.osat[1].tehtavia+kurssi.maara.osat[2].tehtavia} tehtävää</p>
    )
}

const Otsikko =(kurssi)=>{
    return (<h1>Kurssi: {kurssi.otsake}</h1>)
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
