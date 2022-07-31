import { renderMarkdown } from "../util";

const renderAside = (asideMenu: AsideMenu) => {
  return (
    "<el-collapse>" +
    asideMenu
      .map((item): string =>
        item.children
          ? `<el-collapse-item title=${item.title}></el-collapse-item>`
          : `<el-collapse>${renderAside(item.children)}</el-collapse>`
      )
      .join("") +
    "</el-collapse>`"
  );
};

export default ({ title, asideMenu, headerMenu, mainText }: HtmlArg) => {
  const baseHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" href="./index.css" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
    />
    <script src="https://unpkg.com/vue@2.6.0/dist/vue.min.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
  </head>
  <body>
    <header class="header">
      ${headerMenu.map((item) => `<span>${item}</span>`)}
    </header>
    <div class="mainBox">
      <aside class="aside">
        ${renderAside(asideMenu)}
      </aside>
      <main class="main">${renderMarkdown(mainText)}</main>
    </div>
    <script>
      new Vue({
        el: "#app",
        data: function () {
          return { visible: false };
        },
      });
    </script>
  </body>
</html>
`;
};
