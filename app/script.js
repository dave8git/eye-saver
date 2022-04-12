import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off', //work, rest
    time: 0, // zmienna licznika 
    timer: null
  }
  formatTime() {
    let minutes = 0;
    let seconds = 0; 

    minutes = Math.floor(this.state.time/60); 
    seconds = this.state.time - (minutes*60); 
    if(minutes < 10) {
      minutes = `0${minutes}`;
    }
    if(seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
  startTimer() {
    console.log('Działa! :) dupadupa')
    this.setState({
      timer: setInterval(() => {this.step()}, 1000),
      time: 12,
      status: 'work',
    });
  }
  stopTimer() {
    clearInterval(this.state.timer);
    this.setState({
      time: 0,
      status: 'off',
    });
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  step() {
    if(this.state.time != 0) {
      //this.playBell();
      this.setState({
        time: this.state.time - 1,
      });
    } else {
      if(this.state.status === 'rest') {
        this.playBell();
        this.setState({
          status: 'work',
          time: 1200,
        });
      } else {
        this.playBell();
        this.setState({
          status: 'rest',
          time: 20,
        });
      }
    } 
  }
  closeApp() {
    window.close(); 
  }
  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        { this.state.status === 'off' &&
           (
          <div>
           <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
           <p>This app will help you track your time and inform you when it's time to rest.</p>
           </div>
           )
        }
        { this.state.status === 'work' && 
        <img src="./images/work.png" />
        }
        { this.state.status === 'rest' &&
        <img src="./images/rest.png" />
        }
        { this.state.status !== 'off' &&
        <div className="timer">
         {this.formatTime()}
        </div>
        }
        { this.state.status === 'off' &&
        <button className="btn" onClick={() => {this.startTimer()}}>Start</button>
        }
        { this.state.status !== 'off' &&
        <button className="btn" onClick={() => {this.stopTimer()}}>Stop</button>
        }
        <button className="btn btn-close" onClick={() => {this.closeApp()}}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
