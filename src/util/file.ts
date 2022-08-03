import JSZip from "jszip";
import { saveAs } from "file-saver";
import { makePage } from "./content/common";
import { makeIndexPage } from "./content/root";
import { makeCss } from "./style";

// 生成网站index页面
const generateIndexHtml = (root: JSZip, blog: Blog) => {
  root.file("index.html", makeIndexPage("主页", blog));
};

// 生成文件夹级别index页面，若没有text则生成目录作为默认内容
const generateFolderHtml = (node: BlogItem) =>
  node.text ? makePage(node) : makeIndexPage(node.name, node.children);

// 以给定目录为跟节点，便利Blog对象生成文件结构
const generateHtml = (root: JSZip, blog: Blog) => {
  blog.map((item) => {
    if (item.isPage) {
      root.file(item.name + ".html", makePage(item));
    } else {
      const folder = root.folder(item.name) as JSZip;
      item.children.map((child) => {
        if (child.isPage) {
          folder.file(child.name + ".html", makePage(child));
        } else {
          generateHtml(folder, child.children);
          folder.file("index.html", generateFolderHtml(item));
        }
      });
    }
  });
};

// 生成样式文件
const generateCss = (root: JSZip) => {
  root.file("index.css", makeCss());
};

// 根据Blog对象，生成网站源码并下载
export const generateZip = (blog: Blog) => {
  var zip = new JSZip();

  // 生成网站代码
  generateIndexHtml(zip, blog);
  generateHtml(zip, blog);
  generateCss(zip);

  // 下载文件
  zip
    .generateAsync({ type: "blob" })
    .then((content) => saveAs(content, "example.zip"));
};
