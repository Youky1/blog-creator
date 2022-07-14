declare module "*.css";

declare interface HeaderConfig {}
declare interface AsideConfig {}
declare interface FooterConfig {}

interface BlogItem {
  name: string;
  isPage: boolean;
  text: string;
  children: Array<BlogItem>;
}

declare type Blog = Array<BlogItem>;

declare interface FooterContent {
  show: boolean;
  text: string;
}
