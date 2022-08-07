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

declare type AsideMenu = Array<{
  title: string;
  children: AsideMenu;
}>;

declare type HeaderMenu = Array<{
  text: string;
  isPage: boolean;
}>;
declare interface HtmlArg {
  name: string;
  headerMenu: HeaderMenu;
  asideMenu: AsideMenu;
  text: string;
  depth: number;
}
