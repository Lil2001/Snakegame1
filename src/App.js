import classes from "./UI/Global.module.css"
import './App.css';
import {React, Component } from "react";
import Section from './components/Section';
import Snake from "./components/Snake";

import SnakeFood from "./components/Snakefood";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [5,0]
  ],
  count: 0,
}

class App extends Component {

  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 4, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 4, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 4];
        break;
      case 'UP':
        head = [head[0], head[1] - 4];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if ((head[0] > food[0] - 3 && head[0] < food[0] + 3) && (head[1] > food[1] - 3 && head[1] < food[1] + 3)) {
      this.setState({
        food: getRandomCoordinates(),
        count: this.state.count + 1,
      })
      this.enlargeSnake();
      this.increaseSpeed();
      
    
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}. Play again?`);
    console.log(this.state.count)
    this.setState(initialState)
  }

render(){
    return(
     <>
     
      <Section className={classes.area}>
      <Snake snakeDots={this.state.snakeDots}/>
      <SnakeFood value={this.state.food}/>
      </Section>
      <Section className={classes.countplus}>Your count is {this.state.count}</Section>
      </> 
      
      
    )
  }
}

export default App;

