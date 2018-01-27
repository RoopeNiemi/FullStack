import React from 'react'




const Kurssi=({kurssi})=>{

const Otsikko = ({kurssi}) => <h1>  {kurssi.nimi}</h1>

const Sisalto=({osa})=>{
    return (
        <p> Osa {osa.id}: {osa.nimi}, tehtäviä {osa.tehtavia} </p>
        )
    }
    
const tehtaviaYhteensa=(osat)=>{
    const kurssinosat=osat.map (osa => osa.tehtavia)
    const yhteismaara= kurssinosat.reduce((total,amount)=> total+amount)
    return (
        <p>Tehtäviä yhteensä:{yhteismaara}</p>
    )
}

return (
    <div>
        <Otsikko kurssi={kurssi}/>
        {kurssi.osat.map(osa => <Sisalto key={osa.id} osa={osa}  />)}
        {tehtaviaYhteensa(kurssi.osat)}
    </div>
)

}

export default Kurssi