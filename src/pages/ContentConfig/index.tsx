import React, { useRef, useState } from "react";
import { Drawer, Tabs, Collapse, Button, Modal, Input } from "antd";
import renderCollapse from "./components/renderCollapse";
import { getBlogItem } from "../../util";
import { useBlog } from "../../hooks";
import { cloneDeep } from "lodash";
import "./index.css";

const { TabPane } = Tabs;

export default function () {
  // 内容
  const { blog, setBlog } = useBlog();
  const currentBlog = cloneDeep(blog);

  // 新增顶层文件/目录
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newName, setNewName] = useState("");
  const currentKeys = useRef<Array<number>>([]);
  const handleConfirmAdding = () => {
    let flag = true;
    const fatherNode = getBlogItem(currentBlog, currentKeys.current);
    const depth = currentKeys.current.length;

    // 同名检查
    const currentNode = fatherNode[currentKeys.current[depth - 1]];
    (depth > 0 ? currentNode.children : fatherNode).map((item) => {
      if (item.name === newName && item.isPage === isAddingFile) {
        Modal.warn({ title: "添加失败，该名称已存在" });
        flag = false;
        return;
      }
    });

    if (flag) {
      const obj = {
        name: newName,
        isPage: isAddingFile,
        text: "",
        children: [],
      };
      if (depth === 0) {
        fatherNode.push(obj);
      } else {
        fatherNode[currentKeys.current[depth - 1]].children.push(obj);
      }
      setBlog(currentBlog);
    }
    setNewName("");
    setIsAddingFolder(false);
    setIsAddingFile(false);
    currentKeys.current = [];
  };

  // 操作回调函数
  const handleAddFile = (keys: Array<number>) => {
    currentKeys.current = keys;
    setIsAddingFile(true);
  };
  const handleAddFolder = (keys: Array<number>) => {
    currentKeys.current = keys;
    setIsAddingFolder(true);
  };
  const handleRemove = (keys: Array<number>) => {
    Modal.confirm({
      title: "确认要删除吗",
      onOk() {
        const fatherNode = getBlogItem(currentBlog, keys);
        fatherNode.splice(keys[keys.length - 1], 1);
        setBlog(currentBlog.concat());
      },
    });
  };

  return (
    <div>
      {/* 配置窗口 */}
      <div className="aside-box">
        <Tabs defaultActiveKey="1">
          <TabPane tab="内容设置" key="1">
            <Button onClick={() => setIsAddingFolder(true)}>添加目录</Button>
            <Button onClick={() => setIsAddingFile(true)}>添加文件</Button>
            <Collapse defaultActiveKey={["1"]} style={{ marginTop: 20 }}>
              {renderCollapse(
                blog,
                [],
                handleAddFile,
                handleAddFolder,
                handleRemove
              )}
            </Collapse>
          </TabPane>
          <TabPane tab="样式设置" key="2">
            样式设置
          </TabPane>
        </Tabs>
      </div>

      {/* 内容填写弹出窗口 */}
      <Modal
        title={isAddingFile ? "新建文件名称" : "新建目录名称"}
        visible={isAddingFile || isAddingFolder}
        onCancel={() => {
          setIsAddingFolder(false);
          setIsAddingFile(false);
          setNewName("");
        }}
        onOk={handleConfirmAdding}
      >
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </Modal>
    </div>
  );
}
