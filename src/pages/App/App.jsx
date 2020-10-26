import React, { Component } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import {
  Button,
  NavBar,
  WhiteSpace,
  WingBlank,
  List,
  TextareaItem,
  InputItem,
  Picker,
  Icon
} from "antd-mobile";
import Qrcode from "@icedesign/qrcode";
import UpdateToast from "./../../components/UpdateToast";
import { CompactPicker } from "react-color";
import ColorBlock from "./../../components/color-block";
import "./App.less";
import imgAbout from "./../../static/svg/about.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      fgColor: "#000",
      bgColor: "#fff",
      level: ["L"],
      size: 200,
      showFg: false,
      showBg: false,
      showPage: ""
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleGoTo = this.handleGoTo.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleColorClick = this.handleColorClick.bind(this);
    this.handleColorPickerChange = this.handleColorPickerChange.bind(this);
    this.handleSavePic = this.handleSavePic.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener("popstate", () => {
      this.setState({
        showPage: ""
      });
    });
    window.chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (!tabs) return;
      const url = tabs[0].url;
      this.setState(
        {
          value: url
        },
        () => {
          this.handleGoTo("gen");
        }
      );
    });
  }

  handleSizeChange(value) {
    this.setState({
      size: +value
    });
  }

  handleValueChange(value) {
    this.setState({
      value
    });
  }

  handleGoTo(name) {
    this.setState({
      showPage: name
    });
    window.history.pushState(null, null, "#" + Math.random());
  }

  handleLevelChange(value) {
    this.setState({
      level: value
    });
  }

  handleColorClick(name) {
    this.setState({
      showBg: false,
      showFg: false,
      [name]: true
    });
  }

  handleColorPickerChange(name, value) {
    this.setState({
      [name]: value.hex,
      showBg: false,
      showFg: false
    });
  }

  handleSavePic() {
    if (this.qrDOM) {
      let link = document.createElement("a");
      link.download = Date.now() + ".png";
      link.href = this.qrDOM.querySelector("canvas").toDataURL();
      link.click();
      link = null;
    }
  }

  render() {
    const {
      value,
      fgColor,
      bgColor,
      level,
      size,
      showFg,
      showBg,
      showPage
    } = this.state;
    return (
      <div className="app">
        <div>
          <NavBar
            mode="dark"
            rightContent={[
              <img
                src={imgAbout}
                key="1"
                alt=""
                onClick={() => this.handleGoTo("about")}
              />
            ]}
          >
            二维码生成器
          </NavBar>
          <UpdateToast />
          <List>
            <TextareaItem
              ref={_ => (this.valueDOM = _)}
              placeholder="请输入文字内容"
              autoHeight
              clear={true}
              rows={5}
              onChange={this.handleValueChange}
              value={value}
            />
          </List>
          <WhiteSpace />
          <List>
            <Picker
              data={[
                { value: "L", label: "7%" },
                { value: "M", label: "15%" },
                { value: "Q", label: "25%" },
                { value: "H", label: "30%" }
              ]}
              value={level}
              cols={1}
              onChange={this.handleLevelChange}
            >
              <List.Item>纠错等级</List.Item>
            </Picker>
            <List.Item
              onClick={() => this.handleColorClick("showFg")}
              extra={<ColorBlock color={fgColor} size={15} float="right" />}
            >
              前景色
            </List.Item>
            {showFg && (
              <div className="app-color">
                <CompactPicker
                  color={fgColor}
                  onChangeComplete={value =>
                    this.handleColorPickerChange("fgColor", value)
                  }
                />
              </div>
            )}
            <List.Item
              onClick={() => this.handleColorClick("showBg")}
              extra={<ColorBlock color={bgColor} size={15} float="right" />}
            >
              背景色
            </List.Item>
            {showBg && (
              <div className="app-color">
                <CompactPicker
                  color={bgColor}
                  onChangeComplete={value =>
                    this.handleColorPickerChange("bgColor", value)
                  }
                />
              </div>
            )}
            <InputItem
              type="digit"
              value={size}
              className="app-number-input"
              onChange={this.handleSizeChange}
            >
              尺寸
            </InputItem>
          </List>
          <WhiteSpace />
          <WingBlank>
            <Button
              type="primary"
              size="small"
              onClick={() => this.handleGoTo("gen")}
            >
              生成
            </Button>
          </WingBlank>
        </div>
        <div
          className={classnames("app-page", {
            "page-show": showPage === "gen"
          })}
        >
          <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => window.history.back()}
          >
            生成二维码
          </NavBar>
          <WhiteSpace />
          <WingBlank>
            <Qrcode.Panel
              className="app-qr"
              ref={_ => (this.qrDOM = ReactDOM.findDOMNode(_))}
              value={value}
              size={size}
              level={level[0]}
              fgColor={fgColor}
              bgColor={bgColor}
              text={value}
            />
          </WingBlank>
          <WhiteSpace />
          <Button
            size="small"
            inline={true}
            type="ghost"
            onClick={this.handleSavePic}
          >
            下载二维码
          </Button>
          <div className="app-powerby">
            PWA Version:
            <a
              href="#"
              onClick={() =>
                window.chrome.tabs.create({
                  url: "https://lp-pwa.gitee.io/qrcode-web/"
                })
              }
            >
              LP QRcode
            </a>
          </div>
        </div>

        <div
          className={classnames("app-page", "app-page-about", {
            "page-show": showPage === "about"
          })}
        >
          <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => window.history.back()}
          >
            关于
          </NavBar>
          <WhiteSpace />
          <p>作者：快乐平方 . LECEPIN</p>
          <p style={{ fontSize: 12 }}>
            GitHub:{" "}
            <a
              href="#"
              onClick={() =>
                window.chrome.tabs.create({
                  url: "https://github.com/lecepin"
                })
              }
            >
              Lecepin
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
