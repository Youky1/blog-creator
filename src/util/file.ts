import JSZip from "jszip";
import { saveAs } from "file-saver";
import { makePage } from "./content/page";
import { makeIndexPage } from "./content/folder";
import { makeCss } from "./style";

// 生成网站index页面
const generateIndexHtml = (root: JSZip, blog: Blog) => {
  root.file("index.html", makeIndexPage("主页", blog, 0));
};

// 生成文件夹级别index页面，若没有text则生成目录作为默认内容
const generateFolderHtml = (
  root: Blog,
  node: BlogItem,
  depth: number,
  rootIndex: number
) =>
  node.text
    ? makePage(root, node, depth, rootIndex)
    : makeIndexPage(node.name, node.children, depth);

// 以给定目录为跟节点，遍历Blog对象生成文件结构
const generateHtml = (
  root: JSZip,
  blog: Blog,
  depth = 0,
  rootIndex?: number
) => {
  blog.map((item, index) => {
    const i = rootIndex || index;
    if (item.isPage) {
      root.file(item.name + ".html", makePage(blog, item, depth, i));
    } else {
      const folder = root.folder(item.name) as JSZip;
      folder.file("index.html", generateFolderHtml(blog, item, depth, i));
      generateHtml(folder, item.children, depth + 1, i);
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

  console.log(zip);
  // 下载文件
  zip
    .generateAsync({ type: "blob" })
    .then((content) => saveAs(content, "example.zip"));
};
