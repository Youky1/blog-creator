import React from "react";
import { Link } from "react-router-dom";
import s from "./index.module.scss";
import { useBlog } from "../../hooks";
import { generateZip } from "../../util";
export default function () {
  const { blog } = useBlog();
  const handleDownload = () => {
    generateZip(blog);
  };
  return (
    <header className={s.header}>
      <Link to="/config/content">配置内容</Link>
      <Link to="config/style">配置样式</Link>
      <button onClick={handleDownload}>下载</button>
    </header>
  );
}
