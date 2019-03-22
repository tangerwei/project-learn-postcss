import React, { Component } from "react";
import { Input, Button, Icon, Row, Col, message } from "antd";
import copy from "copy-to-clipboard";
const { TextArea } = Input;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueLeft: "",
      valueRight: ""
    };
  }
  handleChange = e => {
    console.log(e);
    this.setState({
      valueLeft: e.target.value
    });
  };
  setValue = () => {
    const valueLeft = this.state.valueLeft.split("?");
    if (valueLeft.length < 2) {
      message.error("链接中没有任何参数", 1);
      return;
    }
    const paras = {};
    const extraData = {};
    valueLeft[1].split("&").map(t => {
      const b = t.split("=");
      if (["appId", "page", "query"].includes(b[0])) {
        if (b[0] === "appId") {
          paras.appId = b[1];
        }
        if (b[0] === "page") {
          paras.path = b[1];
        }
        if (b[0] === "query") {
          const c = decodeURIComponent(b[1]);
          c.split("&").map(v => {
            const d = v.split("=");
            extraData[d[0]] = d[1];
            return true;
          });
        }
      } else {
        extraData[b[0]] = b[1];
      }
      return true;
    });
    paras.extraData = extraData;
    this.setState({
      valueRight: "miniprogram://" + JSON.stringify(paras)
    });
  };
  copy = () => {
    copy(this.state.valueRight);
    message.success("复制成功", 1);
  };
  render() {
    return (
      <div className="App" style={{ marginTop: "20px" }}>
        <Row>
          <Col span={12} offset={6}>
            <p>链接转换</p>
            <TextArea
              rows={4}
              value={this.state.valueLeft}
              onChange={this.handleChange}
              placeholder="请输入旧的链接"
            />
            <Button
              type="primary"
              onClick={this.setValue}
              style={{ marginTop: "20px" }}
            >
              转换
              <Icon type="right" />
            </Button>
            <div>
              <TextArea
                rows={4}
                value={this.state.valueRight}
                readOnly={true}
                placeholder="暂无转换结果"
                style={{ marginTop: "20px" }}
              />
              <Button onClick={this.copy} style={{ marginTop: "20px" }}>
                复制
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
