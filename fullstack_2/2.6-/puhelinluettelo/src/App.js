import React from 'react';
import personService from './services/persons';
import Notification from './components/Notification'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filteredName: '',
      message: ''
    }
  }

  componentWillMount() {
    console.log('will mount')
    personService
    .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response })
      })
  }



  deletePerson=(event)=>{
    console.log(event.target.value)
    const id=event.target.value
    const name=this.findPerson(Number(event.target.value))
    personService.deletePerson(event.target.value)
    personService.getAll()
      .then(response => {
        this.setState({ persons: this.state.persons.filter(n=> Number(n.id)!==Number(id)) })
        this.setState({message: 'Deleted contact '+name.name})
      })
      setTimeout(()=>{
        this.setState({message: ''})
      },5000)
  }
  
  update=(person,id)=>{
    personService.update(id, person)
    .then(person =>{
      const persons = this.state.persons.filter(n=> Number(n.id)!== Number(id))
      this.setState({
        persons: persons.concat(person),
        message: 'Changed contact '+person.name+" 's number."
      })
    })
    .catch(error=>{
      alert('The contact '+person.name+' has already been deleted from the server.')
      this.setState({persons: this.state.persons.filter(n=> Number(n.id)!==id)})
    })

    setTimeout(()=>{
      this.setState({message: ''})
    },5000)
}


  addPerson= (event) =>{
    event.preventDefault()
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const personsWithName=this.state.persons.filter(function(element){
      return element.name===newPerson.name
    })
    if(personsWithName.length>0) {
      const number = personsWithName[0].number
      if(Number(number)!==Number(this.state.newNumber)){
        const result=window.confirm('A person with the name '+this.state.newName+' is already in the catalogue, replace old number with new one?')
        if(result){
          this.update(newPerson,personsWithName[0].id)
          return
        }
        else{
          return
        }
      }
    }
    
    personService
    .create(newPerson)
    .then(response => {
      this.setState({
        persons: this.state.persons.concat(response),
        message: 'Added contact '+this.state.newName +'.',
        newName: '',
        newNumber: ''
      })
      setTimeout(()=>{
        this.setState({message: ''})
      },5000)
    })
  }

  confirmDelete=(event)=>{
    const name=this.findPerson(Number(event.target.value))
    const result=window.confirm('Delete contact '+name.name+'?')
    if(result){
      this.deletePerson(event,name)
    }
  }

  findPerson=(id)=>{
    const person=this.state.persons.find(n=> Number(n.id)===Number(id))
    return person
  }

  handleNameChange=(event)=>{
    this.setState({newName: event.target.value})
  }

  handleNumberChange=(event)=>{
    this.setState({newNumber: event.target.value})
  }

  handleFilteredNameChange=(event)=>{
    this.setState({filteredName: event.target.value})
  }

  render() {
    const Title=()=> <h1> Phonebook </h1>

    const Notify=()=>{
      if(this.state.message===''){
        return (
          <div>
          </div>
        )
      }
      else{
        return (
          <Notification message={this.state.message}/>
        )
      }
    }

    const NumberList=(props)=>{
      const filter=props.states.filteredName
      return (
        <div>
          <h2>Numbers</h2>
        <table>
          <tbody>
            {props.states.persons.filter(function(element){
              return element.name.toLowerCase().includes(filter.toLowerCase())})
              .map(person => <ListItem key={person.name} person={person}/>)}
          </tbody>
        </table>
        </div>
      )
    }
    
    const ListItem=({person})=>{
      return (
        <tr>
          <td>
            {person.name}
          </td>
          <td>
            {person.number}
          </td>
          <td>
          <button value={person.id} onClick={this.confirmDelete}>Delete</button>
          </td>
        </tr>
      )
    }

    return (
      <div>
        <Title/>
        <Notify/>
        Filter <input value={this.state.filteredName}
        onChange={this.handleFilteredNameChange}/>
        <h2>Add new person </h2>
        <form onSubmit={this.addPerson}>
          <div>
            name: <input value={this.state.newName}
            onChange={this.handleNameChange}
            /> 
          </div>
          <div>
            number: <input value={this.state.newNumber} 
            onChange={this.handleNumberChange}/>
          </div>  
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <NumberList states={this.state}/>
      </div>
    )
  }
}

export default App