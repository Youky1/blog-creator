import MarkdownIt from "markdown-it";

// 将md转换成html
const md2html = (md: string) => new MarkdownIt().render(md);

// 获取项目跟路径
const getRootPath = (depth: number) => {
  let temp = "";
  for (let i = 0; i < depth; i++) {
    temp += "../";
  }
  return temp;
};

// 生成header内容
const generateHeader = (depth: number, headerMenu: HeaderMenu) => {
  console.log("headerMenu", headerMenu);
  return headerMenu
    .map(
      (item) => `
    <span class="header-item">
      <a href='${getRootPath(depth)}${item.text}${
        item.isPage ? ".html" : "/index.html"
      }'>${item.text}</a>
    </span>`
    )
    .join("");
};

// 生成侧边栏内容
const generateAside = (path: Array<string>, asideMenu: AsideMenu) => {
  const temp = path.concat();
  return (
    "<div>" +
    asideMenu
      .map((item): string => {
        temp.push(item.title);
        const target = getRootPath(path.length - 1) + temp.join("/") + ".html";
        return item.children
          ? `<div>
              <a href="${target}">${item.title}</a>
              ${generateAside(temp, item.children)}
            </div>`
          : `<a href="${target}">${item.title}</a>`;
      })
      .join("") +
    "</div>"
  );
};

// 生成页面HTML
export const generateHtml = ({
  name,
  headerMenu,
  asideMenu,
  text,
  depth,
}: HtmlArg) => {
  console.log(name, md2html(text));
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body>
    <div id="app">
      <header class="header">${generateHeader(depth, headerMenu)}</header>
      <div class="mainBox">
        <aside class="aside">${generateAside([], asideMenu)}</aside>
        <main class="main">${md2html(text)}</main>
      </div>
    </div>
  </body>
</html>
`;
};
