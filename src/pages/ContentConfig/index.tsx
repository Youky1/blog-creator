import React, { useRef, useState } from "react";
import { Collapse, Button, Modal, Input } from "antd";
import renderCollapse from "./components/renderCollapse";
import { getBlogItem } from "../../util";
import { useBlog, useCurrentContent } from "../../hooks";
import "./index.css";
import Editor from "for-editor";

export default function () {
  // 内容
  const { blog, setBlog } = useBlog();

  // 新增顶层文件/目录
  const [currentAdding, setCurrentAdding] = useState("");
  const [newName, setNewName] = useState("");
  const currentKeys = useRef<Array<number>>([]);
  const editingFile = useRef<Array<number>>([]);
  const handleConfirmAdding = () => {
    if (!newName) {
      Modal.warn({ title: "添加失败，名称不能为空" });
      return;
    }
    let flag = true;
    const fatherNode = getBlogItem(blog, currentKeys.current);
    const depth = currentKeys.current.length;
    const isPage = currentAdding === "文件";

    // 同名检查
    const currentNode = fatherNode[currentKeys.current[depth - 1]];
    (depth > 0 ? currentNode.children : fatherNode).map((item) => {
      if (item.name === newName && item.isPage === isPage) {
        Modal.warn({ title: "添加失败，该名称已存在" });
        flag = false;
        return;
      }
    });

    if (flag) {
      const obj = {
        name: newName,
        isPage,
        text: "",
        children: [],
      };
      if (depth === 0) {
        fatherNode.push(obj);
      } else {
        fatherNode[currentKeys.current[depth - 1]].children.push(obj);
      }
      setBlog(blog);
    }
    setNewName("");
    setCurrentAdding("");
    currentKeys.current = [];
  };

  // 操作回调函数
  const handleAddFile = (keys: Array<number>) => {
    currentKeys.current = keys;
    setCurrentAdding("文件");
  };
  const handleAddFolder = (keys: Array<number>) => {
    currentKeys.current = keys;
    setCurrentAdding("目录");
  };
  const handleRemove = (keys: Array<number>) => {
    Modal.confirm({
      title: "确认要删除吗",
      onOk() {
        const fatherNode = getBlogItem(blog, currentKeys.current);
        fatherNode.splice(keys[keys.length - 1], 1);
        setBlog(blog.concat());
      },
    });
  };
  const handleEdit = (keys: Array<number>) => {
    editingFile.current = keys;
  };

  // 修改文件内容
  const { currentContent, setCurrentContent } = useCurrentContent();
  const handleSaveChange = (value: string) => {
    setCurrentContent(value);
    const fatherNode = getBlogItem(blog, editingFile.current);
    const depth = editingFile.current[editingFile.current.length - 1];
    fatherNode[depth].text = value;
    setBlog(blog);
  };

  return (
    <div className="page-box">
      {/* 配置窗口 */}
      <div className="aside-box">
        <Button onClick={() => setCurrentAdding("目录")}>添加目录</Button>
        <Button onClick={() => setCurrentAdding("文件")}>添加文件</Button>
        <Button onClick={() => console.log(blog)}>Blog</Button>
        <Collapse defaultActiveKey={["1"]} style={{ marginTop: 20 }}>
          {renderCollapse(
            blog,
            [],
            handleAddFile,
            handleAddFolder,
            handleRemove,
            handleEdit
          )}
        </Collapse>
      </div>

      {/* 内容填写弹出窗口 */}
      <Modal
        title={`${currentAdding}名称`}
        visible={currentAdding.length > 0}
        onCancel={() => {
          setCurrentAdding("");
          setNewName("");
        }}
        onOk={handleConfirmAdding}
      >
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </Modal>

      {/* 文件内容填写部分 */}
      <div className="content-box">
        <Editor
          value={currentContent}
          onChange={handleSaveChange}
          height="100%"
          onSave={handleSaveChange}
        />
      </div>
    </div>
  );
}
