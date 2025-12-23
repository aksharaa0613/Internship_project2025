import React, { Component } from 'react';

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'This is a Class Component example',
      count: 0
    };
  }

  componentDidMount() {
    console.log('ClassComponent mounted');
  }

  handleClick = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div className="class-component">
        <h3>{this.state.message}</h3>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick} className="btn btn-primary">
          Increment
        </button>
      </div>
    );
  }
}

export default ClassComponent;