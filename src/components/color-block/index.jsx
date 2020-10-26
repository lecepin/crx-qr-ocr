import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.less";

class ColorBlock extends Component {
  static defaultProps = {
    color: "#ffffff",
    size: 20,
    float: "unset"
  };

  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    float: PropTypes.string
  };

  render() {
    const { size, color, float } = this.props;
    return (
      <div
        className="color-block"
        style={{
          width: size + "px",
          height: size + "px",
          backgroundColor: color,
          float,
          border: "1px solid #000"
        }}
      />
    );
  }
}

export default ColorBlock;
