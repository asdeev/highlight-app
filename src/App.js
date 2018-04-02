import React from 'react';
import './App.css';
import { Control } from './Control';

class App extends React.Component {
  constructor() {
    super();
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  
  render() {
    return (
      <div>
        <textarea value={ this.state.value } onChange={ this.handleChange }></textarea>
        <Control value={ this.state.value } />
      </div>
    );
  }
}

export default App;
