import React from 'react';
import './App.scss';

import ColorItem from './components/color-item/color-item';

const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

class App extends React.Component {
  state = {
    colors: [
      '1ABC9C',
      '2ECC71',
      '3498DB',
      '9B59B6',
      '34495E',
      '16A085',
      '27AE60',
      '2980B9',
      '8E44AD',
      '2C3E50',
      'F1C40F',
      'E67E22',
      'E74C3C',
      'ECF0F1',
      '95A5A6',
    ],
    newColor: "",
    red: 50,
    green: 50,
    blue: 50,
    saturation: "",
  };

  submitNewColor = (e: React.SyntheticEvent) => {
    const { colors, newColor } = this.state;
    e.preventDefault();
    this.setState({ colors: [...colors, newColor] });
    this.setState({ newColor: "" });

    localStorage.setItem('colorsData', JSON.stringify(colors));

    alert(`color #${newColor} has been added!`);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newColor: e.target.value });
  }

  handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { colors } = this.state;

    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const rgb = colors.map((color) => {
      return hexToRgb(color);
    });

    console.log(rgb);

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    const data = localStorage.getItem("colorsData");
  }

  render() {
    const { colors } = this.state;

    return (
      <div className='App'>
        <div className="colors-form">
          <form onSubmit={this.submitNewColor}>
            <label htmlFor="new-color">Add new color:</label>
            <input
              type="text"
              id="new-color"
              name="newColor"
              value={this.state.newColor}
              onChange={this.handleChange} />
            <button>Add</button>
          </form>
          <hr />
          <input type="checkbox" name="r" id="r" onChange={this.handleFilterChange} />
          <label htmlFor="r">red &gt; 50%</label>

          <input type="checkbox" name="green" id="green" onChange={this.handleFilterChange} />
          <label htmlFor="green">green &gt; 50%</label>

          <input type="checkbox" name="blue" id="blue" onChange={this.handleFilterChange} />
          <label htmlFor="blue">blue &gt; 50%</label>

          <input type="checkbox" name="saturation" id="saturation" onChange={this.handleFilterChange} />
          <label htmlFor="saturation">saturation &gt; 50%</label>
          <hr />
        </div>
        <div className="color-list">
          {colors.map((color) => <ColorItem color={color} />)}
        </div>
      </div>
    );
  }
}

export default App;
