import { Collapse } from "antd";
import PanerItem from "./PanerItem";
const { Panel } = Collapse;
const renderCollapse = (
  blog: Blog,
  currentKey: Array<number> = [],
  handleAddFile: Function,
  handleAddFolder: Function,
  handleRemove: Function,
  handleEdit: Function
) => {
  return blog.map((item, index) => {
    const key = currentKey.concat(index);
    if (item.isPage) {
      return (
        <PanerItem
          key={item.name}
          isPage={true}
          name={item.name}
          text={item.text}
          className="collapse-page"
          handleRemove={() => handleRemove(key)}
          handleEdit={() => handleEdit(key)}
        />
      );
    } else {
      return (
        <Panel
          header={
            <PanerItem
              name={item.name}
              className="collapse-menu"
              handleAddFile={() => handleAddFile(key)}
              handleAddFolder={() => handleAddFolder(key)}
              handleRemove={() => handleRemove(key)}
              handleEdit={() => handleEdit(key)}
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
              handleRemove,
              handleEdit
            )}
          </Collapse>
        </Panel>
      );
    }
  });
};

export default renderCollapse;
