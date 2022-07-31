declare module "*.css";
declare module "*.scss";

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

interface AsideMenuItem {
  title: string;
  children: AsideMenu;
}

declare type AsideMenu = Array<AsideMenuItem>;

declare interface HtmlArg {
  title: string;
  headerMenu: Array<string>;
  asideMenu: asideMenu;
  mainText: string;
}
