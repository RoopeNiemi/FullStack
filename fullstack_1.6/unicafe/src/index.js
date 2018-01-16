import React from 'react'
import ReactDOM from 'react-dom'

const Statistics=(props)=>{
    if(props.stat.yhteensa===0){
        return(
            <p>Yhtään palautetta ei ole annettu</p>
        )
    }
    return(
        <div>
            <h3> Statistiikka </h3>
           <Statistic stat={props.stat.hyvä} nimi="Hyvä"/>
           <Statistic stat={props.stat.neutraali} nimi="Neutraali"/>
           <Statistic stat={props.stat.huono} nimi="Huono"/>
            <Keskiarvo stat={props.stat}/>
            <Positiivisia stat={props.stat}/>
        </div>
    )
}
const Statistic=(props)=>{
    return (
        <p>{props.nimi}: {props.stat} </p>
    )
}
 const Keskiarvo=(props)=>{
    return (
        <p>Keskiarvo: {(props.stat.hyvä*1+props.stat.neutraali*0+props.stat.huono*-1)/(props.stat.yhteensa)}</p>
    )
}
 const Positiivisia=(props)=>{
    return (
        <p>Positiivisia: {100*(props.stat.hyvä/(props.stat.yhteensa))}%</p>
    )
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