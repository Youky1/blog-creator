import React from "react";
import { Link } from "react-router-dom";
import s from "./index.module.scss";
export default function () {
  return (
    <header className={s.header}>
      <Link to="/config/content">配置内容</Link>
      <Link to="config/style">配置样式</Link>
    </header>
  );
}
