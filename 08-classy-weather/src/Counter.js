import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = { count: 5 };

    //the bind method manually binds the this keyword to our event handler function
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.setState((curState) => {
      return { count: curState.count - 1 };
    });

    // this.setState({ count: this.state.count - 1 });
    // this.setState({ count: 10});
  }

  handleIncrement() {
    this.setState((curState) => {
      return { count: curState.count + 1 };
    });

    // this.setState({ count: this.state.count - 1 });
  }

  render() {
    const date = new Date("july 2 2027");
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
