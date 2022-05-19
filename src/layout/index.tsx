import React from "react";
import styles from "./index.less";
import classnames from "classnames";
// import { Button } from "antd";
import Button from "antd/lib/button";
import "antd/lib/button/style/css";

interface Props {}

const Layout: React.FC<Props> = () => {
  return (
    <div>
      <span>hello world!</span>
      <span className={classnames(styles["yellow"], "red")}>5556</span>
      <Button type="primary">antd-button</Button>
    </div>
  );
};

export default Layout;
