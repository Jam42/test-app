import React, {Component} from 'react';
import {SketchPicker} from 'react-color';
import './ColorPicker.css';

export default class ColorPicker extends Component {
  constructor (props) {
    super (props);
    this.state = {
      objects: [1, 2, 3, 4, 5],
      background: '#eee',
      objectsBackground: {
        1: '#eee',
        2: '#eee',
        3: '#eee',
        4: '#eee',
        5: '#eee',
      },
      currentObject: '0',
    };
    this.onClick = this.onClick.bind (this);
  }

  handleChangeComplete = color => {
    this.setState ({
      background: color.hex,
      objectsBackground: {
        ...this.state.objectsBackground,
        [this.state.currentObject]: color.hex,
      },
    });
  };

  onClick (event) {
    this.setState ({
      currentObject: event.target.id,
    });
  }

  render () {
    return (
      <div style={{display: 'flex'}}>
        <div>
          <SketchPicker
            width="70%"
            color={this.state.background}
            onChangeComplete={this.handleChangeComplete}
          />
        </div>
        <div className="objects">
          {this.state.objects.map ((item, i) => (
            <div
              id={i}
              key={item}
              style={{background: this.state.objectsBackground[i]}}
              onClick={this.onClick}
            />
          ))}
        </div>
      </div>
    );
  }
}
