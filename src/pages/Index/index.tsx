import React from "react";
import s from "./index.module.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
export default function () {
  return (
    <div>
      <div className={s.slogan}>
        <h1>Easy-Blog</h1>
        <h3>通过简单的操作定义网站的样式和内容</h3>
      </div>
      <Button>介绍</Button>
      <Button>
        <Link to="/create">开始</Link>
      </Button>
    </div>
  );
}
