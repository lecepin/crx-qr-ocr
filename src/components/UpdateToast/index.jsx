import React, { Component } from "react";
import { NoticeBar } from "antd-mobile";
import iconReload from "./reload.svg";
import "./index.css";

export default class UpdateToast extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  state = {
    visible: false,
    isS: true
  };

  componentDidMount() {
    window.addEventListener("sw.update", this.handleUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener("sw.update", this.handleUpdate);
  }

  handleUpdate(e) {
    let isS = true;

    if (e.data && !e.data.isS) {
      // 接收自定义e的值 判断success 和 update
      isS = false;
    }
    this.setState({
      visible: true,
      isS
    });
  }

  render() {
    return (
      <div className="update-toast">
        {this.state.visible && !this.state.isS && (
          <NoticeBar
            mode="link"
            onClick={() => {
              window.location.reload();
            }}
            action={<img src={iconReload} style={{ width: "18px" }} />}
          >
            站点发生更新，请手动刷新
          </NoticeBar>
        )}
        {this.state.visible && this.state.isS && (
          <NoticeBar
            mode="closable"
            onClick={() => this.setState({ notifySuccessVisible: false })}
          >
            成功安装SW
          </NoticeBar>
        )}
      </div>
    );
  }
}
