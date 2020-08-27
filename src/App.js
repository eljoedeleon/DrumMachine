import React, { Component } from 'react';
import './App.css';

const sounds = [
  { id: 'Q', name: 'Heater-1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { id: 'W', name: 'Heater-2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { id: 'E', name: 'Heater-3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { id: 'A', name: 'Heater-4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { id: 'S', name: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { id: 'D', name: 'Open-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { id: 'Z', name: 'Kick-and-Hat', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { id: 'X', name: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { id: 'C', name: 'Closed-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
]

class DrumPad extends Component {

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.keyCode === this.props.id.charCodeAt()) {
      this.audio.volume = this.props.volume / 100;
      this.audio.play();
      this.audio.currentTime = 0;
      this.props.handleDisplay(this.props.name);
    }
  };

  handleClick = () => {
    this.audio.volume = this.props.volume / 100;
    this.audio.play();
    this.audio.currentTime = 0;
    this.props.handleDisplay(this.props.name);
  }

  render() {
    return (

      <div className="drum-pad" id={this.props.id} onClick={this.handleClick}>
        <div className="drum-pad-text">{this.props.id}</div>
        <audio className="clip" ref={ref => this.audio = ref} id={this.props.id} src={this.props.src}></audio>
      </div>

    );
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: "",
      volume: 50
    }
  }

  handleDisplay = (display) => this.setState({ display });
  handleSlider = (e) => this.setState({ volume: e.target.value });

  render() {
    return (
      <div id="drum-machine">
        <div id="display-volume-container">
          <div id="display">{this.state.display}</div>
          <div id="volume-container">
            <input
              className="volume"
              type="range"
              min="0"
              max="100"
              value={this.state.volume}
              onChange={this.handleSlider.bind(this)}></input>
          </div>
        </div>
        {sounds.map((sound, index) => (
          <DrumPad
            key={index}
            id={sound.id}
            name={sound.name}
            src={sound.src}
            handleDisplay={this.handleDisplay}
            volume={this.state.volume}
          />
        ))}
        <footer><a href="https://github.com/eljoedeleon"
          target="_blank"
          rel="noopener noreferrer">ESD</a></footer>
      </div>
    );
  }
}

export default App;
