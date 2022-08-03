export const getBlogItem = (blog: Blog, key: Array<number>) => {
  const keys = key.concat();
  if (keys.length === 0 || keys.length === 1) {
    return blog;
  }
  const index = keys.shift() as number;
  let temp: BlogItem = blog[index];
  while (keys.length > 1) {
    temp = temp.children[keys.shift() as number];
  }
  return temp.children;
};

export * from "./file";
