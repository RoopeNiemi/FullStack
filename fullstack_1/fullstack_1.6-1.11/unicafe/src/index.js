import React from 'react'
import ReactDOM from 'react-dom'

const Statistics=(props)=>{
  const hyvia=props.stat.hyvä
  const neutraaleja= props.stat.neutraali
  const huonoja= props.stat.huono
  const yhteensa= props.stat.yhteensa
    if(props.stat.yhteensa===0){
        return(
            <p>Yhtään palautetta ei ole annettu</p>
        )
    }
    return(
        <div>
            <h3> Statistiikka </h3>
            <table>
            <tbody>
           <Statistic stat={props.stat.hyvä} nimi="Hyvä"/>
           <Statistic stat={props.stat.neutraali} nimi="Neutraali"/>
           <Statistic stat={props.stat.huono} nimi="Huono"/>
           <Statistic stat={keskiarvo(hyvia,neutraaleja,huonoja,yhteensa)} nimi="Keskiarvo"/>
           <Statistic stat={positiivisia(hyvia,yhteensa)}nimi="Positiivisia"/>
           </tbody>
           </table>
        </div>
    )
}
const Statistic=(props)=>{
    if(props.nimi==="Positiivisia"){
     return(
         <tr>
            <td>{props.nimi}: </td>
            <td>{props.stat}% </td>
        </tr>
     )}
    return (
        <tr>
            <td>{props.nimi}: </td>
            <td>{props.stat} </td>
        </tr>
    )
}
function keskiarvo(a,b,c,yht) {
return ((a*1+b*0+c*-1)/yht).toFixed(2)
     
 }
 function positiivisia(a,yht){
     return (100*(a/yht)).toFixed(2)
 }


const Button =({handleClick, text}) =>(
    <button onClick={handleClick}>
    {text}
    </button>
)
  

class App  extends React.Component{
  constructor(props){
      super(props)
      this.state={
          hyvä: 0,
          neutraali: 0,
          huono: 0,
          yhteensa: 0
      }
  }
  lisaaHyva=(arvo,yht)=>{
      return ()=>{
          this.setState({hyvä : arvo})
          this.setState({yhteensa : yht})
      }
  }
  lisaaNeutraali=(arvo,yht)=>{
      
      return ()=>{
          this.setState({neutraali : arvo})
          this.setState({yhteensa : yht})
      }
  }
  lisaaHuono=(arvo,yht)=>{
      return ()=>{
          this.setState({huono : arvo})
          this.setState({yhteensa : yht})
      }
  }
    render(){
        return (
            <div>
                <h1> Anna palautetta</h1>
                <Button handleClick={this.lisaaHyva(this.state.hyvä+1,this.state.yhteensa+1)}
                 text="Hyvä"/>
                  <Button handleClick={this.lisaaNeutraali(this.state.neutraali+1,this.state.yhteensa+1)}
                 text="Neutraali"/>
                   <Button handleClick={this.lisaaHuono(this.state.huono+1,this.state.yhteensa+1)}
                 text="Huono"/>
                <Statistics stat={this.state}/>
            </div>
        )
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
)