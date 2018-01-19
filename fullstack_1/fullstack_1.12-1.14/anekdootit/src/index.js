import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votesMax:0,
      mostVotesAnecdote:""
    }
    
    this.aanesta.bind(this)
    this.asetaSatunnainenArvo.bind(this)
  }

  asetaSatunnainenArvo =()=>{
    return ()=>{
    this.setState({selected : getRandomInt(this.props.anecdotes.length)})
    }
  }

  aanesta=()=>{
    return ()=>{
      this.props.anecdotes[this.state.selected].aania++
      if(this.props.anecdotes[this.state.selected].aania > this.state.votesMax){
        this.setState({votesMax: this.props.anecdotes[this.state.selected].aania})
        this.setState({mostVotesAnecdote: this.props.anecdotes[this.state.selected].lause})
        }
      const redirect=this.state.selected
      this.setState({selected : redirect})
  }}


  render() {
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected].lause}</p>
        <VotesDisplay votes={this.props.anecdotes[this.state.selected].aania}/>
        <Button handleClick={this.aanesta()} text="Vote"/>
        <Button handleClick={this.asetaSatunnainenArvo()} text="Next anecdote"/>
        <TopAnecdote topLause={this.state.mostVotesAnecdote} votes={this.state.votesMax}/>
      </div>
    )
  }

}
function getRandomInt(max) {
    return Math.floor(Math.random() * (max));
  }


const Button =({handleClick, text}) =>(
    <button onClick={handleClick}>
    {text}
    </button>
)

const TopAnecdote=(props)=>{
  if(props.topLause===""){
    return (
      <p> No anecdote has been voted yet</p>
    )
  }
  return (
    <div>
      <p>Anecdote with most votes: </p>
      <p>{props.topLause}</p>
      <p> Has {props.votes} votes</p>
  </div>
)
}

const VotesDisplay=(props)=>{
  return (
   <div> Has {props.votes} votes </div>
  )}

const anecdotes = [
  {
    lause:'If it hurts, do it more often', aania: 0
  },
  {
  lause:'Adding manpower to a late software project makes it later!',aania:0
  },
  {
  lause:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', aania:0
  },
  {
    lause:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', aania:0
  },
  {
    lause: 'Premature optimization is the root of all evil.',aania:0
  },
  {
    lause:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',aania:0}
]




ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)