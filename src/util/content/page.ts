import { generateHtml } from "./base";

// 将md结合模板转换成页面最终的html文件
export const makePage = (
  root: Blog,
  node: BlogItem,
  depth: number,
  rootIndex: number
) => {
  const { asideMenu, headerMenu } = analyzePage(root, rootIndex);
  const { name, text } = node;
  return generateHtml({
    name,
    asideMenu,
    headerMenu,
    text,
    depth,
  });
};

// 分析得到当前页面的Header和侧边栏内容
const analyzePage = (node: Blog, rootIndex: number) => {
  function getMenu(father: Blog) {
    const asideMenu: AsideMenu = father.map((item) => {
      return {
        title: item.name,
        children: item.children ? getMenu(item.children) : [],
      };
    });
    return asideMenu;
  }

  const headerMenu = node.map((item) => ({
    text: item.name,
    isPage: item.isPage,
  }));
  return {
    asideMenu: getMenu(node),
    headerMenu,
  };
};
