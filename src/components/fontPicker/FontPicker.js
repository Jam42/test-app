import React, {Component} from 'react';
import fontsList from 'google-fonts-complete';

import WebFont from 'webfontloader';

export default class FontPicker extends Component {
  constructor (props) {
    super (props);
    this.state = {
      fontsArray: [],
      fontsToApply: [],
      loading: true,
      currentFont: 'Roboto',
    };
    this.onChangeSearch = this.onChangeSearch.bind (this);
    this.onCurrentFontChange = this.onCurrentFontChange.bind (this);
    this.onClick = this.onClick.bind (this);
  }

  componentDidMount () {
    let fontsArray = [];
    for (const font in fontsList) {
      fontsArray.push (font);
    }
    this.setState ({fontsArray, loading: false});
  }

  onChangeSearch (event) {
    event.preventDefault ();
    const {value} = event.target;
    this.setState ({
      currentInput: value,
    });
  }

  onClick () {
    const value = this.state.currentInput;
    if (
      this.state.fontsArray.includes (value) &&
      !this.state.fontsToApply.includes (value)
    ) {
      this.setState (
        {
          fontsToApply: [...this.state.fontsToApply, value],
        },
        () => {
          WebFont.load (
            {
              google: {
                families: [value],
              },
            },
            () => {
              this.setState ({
                currentFont: value,
              });
            }
          );
        }
      );
    }
  }

  onCurrentFontChange (event) {
    const {value} = event.target;
    this.setState ({
      currentFont: value,
    });
  }

  render () {
    return this.state.loading
      ? <div>Loading...</div>
      : <div>
          <div style={{display: 'inline'}}>
            <input
              style={{margin: '10px'}}
              type="text"
              onChange={this.onChangeSearch}
            />
            <button onClick={this.onClick}>Add</button>
          </div>
          <select
            onChange={this.onCurrentFontChange}
            defaultValue={this.state.currentFont}
          >
            {this.state.fontsToApply.map ((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>
          <p style={{fontFamily: this.state.currentFont}}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>;
  }
}
