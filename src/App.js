import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'


class App extends Component {

  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    showPersons: false
  }


deletePersonHandler = (personIndex) => {
  const persons = this.state.persons;
  persons.splice(personIndex, 1);
  this.setState({persons: persons})

};

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }


  increaseHandler = () => {
    let replica = {...this.state}
    replica.persons[0].age  += 1
    this.setState({
      replica
    })
  }


  togglePersonHandler = () => {
    let personsView = this.state.showPersons;
    this.setState({ showPersons: !personsView })
  }


  render() {
//you can do perform alot of actions here such as data manipulation. API fetches etc.
//So long as this componenet finally returns a JSX element!

const coolStyle = { 
  backgroundColor: 'green',
  color: 'white',
  font: 'inherit',
  border: '1px solid blue',
  padding: '8px',
  cursor: 'pointer',
  margin: '2px 2px',

};

    let persons = null;

    if (this.state.showPersons) {
      coolStyle.backgroundColor = 'red';
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
      

      //we can do this is here because it is still a part of the conditional if statement  - we have the <div> ouputted and now do this!
    }



    //Make the classes that get assigned unto an element dynamically
    //let classes = ['red', 'bold'].join(' ');  this so it will be class="red bold"
    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red'); // classes will be red
    }
    if (this.state.persons.length <=1) {
      classes.push('bold')// classes will be classes = ['red', 'bold];
    }

    return (
      <div className="App">
          Hi I am a React Application!
          <p className={classes.join(' ')}>this is Working</p>

          <button style = { coolStyle } onClick={this.increaseHandler}>up one</button>
          <button style={ coolStyle } onClick={this.togglePersonHandler}>Toggle Persons View</button>
          {persons}
     </div>
    );
    //This is what the above gets compiled into ...
    //return React.createElement('div', {className: 'App'}, React.createElement('h1' ,null, 'Does tis work now!'))
  };
}

export default App ;


/**
 *       
 *
          <button style={ coolStyle } onClick={this.switchNameHandler.bind(this, 'Maximillian')}>Switch Name</button>
 * 
 * 
 * THERE IS ANOTHER PREFFERRED WAY OF OUTPUTING CONDITIONAL CONGENT FROM SECTION 4 VIDEO 51
 *  {
          this.state.showPersons === false ?
          <div>
            <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
            <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'Max!!!')} changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
            <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
          </div> : null
       }

BUT BUT BUT BUT BUT BUT

this is the best practice way of doing it : 
    if (this.state.showPersons) {
      persons = (
        <div>
          <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'Max!!!')} changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
        </div>
      )
    }

    After we click the button and invoke the functionon to update the true or false flag
    once state is updated the render method will rerun before the return and so.... 
    putting this if statement in the render function (where it is javascript land), and then 
    taking the ouput  persons = ( )  <-----you see those parenthesis?? yeah that JSX not reg javascript
    and placin persons in  {persons} than mergin that with the return JSX or NULL if false is clean

 */

 /**
  * 
  *
  * 
  *    
  * 
  *  From section 4 video #53
  * 
  * 
  *  if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map( (person) => {
              return <Person name="person.name" age="person.age" />
            })
          }

          *******WE REMOVED THE THREE LINES BELOW FOR THE 148 - 152 LINES ABOVE -- BELOW WOULD BE HARDCODING BAD!!!
          ABOVE IS MORE OF A RE-ITERATION --A MAP- THAT YES OUTPUTS AN ARRAY OF PERSON COMPONENETS- BUT REMEMBER REACT 16 DOES OUTPUT ARRAYS
          OF COMPONENETS!!
          <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'Max!!!')} changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
        </div>
      )
    }



    return (
  */
