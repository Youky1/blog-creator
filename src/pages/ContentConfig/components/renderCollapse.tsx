import { Collapse } from "antd";
import PanerItem from "./PanerItem";
const { Panel } = Collapse;
const renderCollapse = (
  blog: Blog,
  currentKey: Array<Number> = [],
  handleAddFile: Function,
  handleAddFolder: Function,
  handleRemove: Function
) => {
  return blog.map((item, index) => {
    const key = currentKey.concat(index);
    if (item.isPage) {
      return (
        <Panel
          header={
            <PanerItem
              isPage={true}
              text={item.name}
              className="collapse-page"
              handleRemove={() => handleRemove(key)}
            />
          }
          key={item.name}
          showArrow={false}
        ></Panel>
      );
    } else {
      return (
        <Panel
          header={
            <PanerItem
              text={item.name}
              className="collapse-menu"
              handleAddFile={() => handleAddFile(key)}
              handleAddFolder={() => handleAddFolder(key)}
              handleRemove={() => handleRemove(key)}
            />
          }
          key={item.name}
        >
          <Collapse>
            {renderCollapse(
              item.children,
              key,
              handleAddFile,
              handleAddFolder,
              handleRemove
            )}
          </Collapse>
        </Panel>
      );
    }
  });
};

export default renderCollapse;
