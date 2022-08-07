import { generateHtml } from "./base";

// 生成根目录默认文件
export const makeIndexPage = (name: string, node: Blog, depth: number) => {
  return generateHtml({
    name,
    text: generateDefaultText(node),
    asideMenu: [],
    headerMenu: node.map((item) => ({
      text: item.name,
      isPage: item.isPage,
    })),
    depth,
  });
};

const generateDefaultText = (node: Blog) => {
  const text = node
    .map((item) => {
      let temp = "";
      if (item.isPage) {
        temp = `# [${item.name}](${item.name}.html)\n`;
      } else {
        temp =
          item.children.length > 0
            ? `# ${item.name}\n` +
              item.children
                .map((child) => {
                  const path =
                    child.name + child.isPage ? "/index.html" : ".html";
                  return `- [${child.name}](${path}) `;
                })
                .join("\n")
            : `# [${item.name}](${item.name}/index.html)\n`;
      }
      return temp;
    })
    .join("\n");
  return text;
};
