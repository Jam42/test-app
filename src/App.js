import React, {Component} from 'react';
import FontPicker from './components/fontPicker/FontPicker';
import ColorPicker from './components/colorPicker/ColorPicker';
import './App.css';

export default class App extends Component {
  render () {
    return (
      <div className="App">
        <FontPicker />
        <ColorPicker />
      </div>
    );
  }
}
