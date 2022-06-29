import React, { useState } from "react";
import Header from "./layout/Header";
import Aside from "./layout/Aside";
import Footer from "./layout/Footer";
import { Drawer, Tabs, Collapse, Button, Modal, Input } from "antd";
import renderCollapse from "./components/renderCollapse";

const { TabPane } = Tabs;

export default function () {
  // 样式
  const [contentConfig, setContentConfig] = useState();
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({});
  const [asideConfig, setAsideConfig] = useState<AsideConfig>({});
  const [footerConfig, setFooterConfig] = useState<FooterConfig>({});

  // 内容
  const [blog, setBlog] = useState<Blog>([]);
  const [footerContent, setFooterContent] = useState<FooterContent>({
    show: false,
    text: "",
  });

  // 是否显示配置窗口
  const [showConfig, setShowConfig] = useState(true);

  // 新增顶层文件/目录
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newName, setNewName] = useState("");
  const handleConfirmAdding = () => {
    let flag = true;
    blog.map((item) => {
      if (item.name === newName && item.isPage === isAddingFile) {
        Modal.warn({ title: "添加失败，该名称已存在" });
        flag = false;
        return;
      }
    });
    if (flag) {
      setBlog(
        blog.concat({
          name: newName,
          isPage: isAddingFile,
          text: "",
          children: [],
        })
      );
    }
    setNewName("");
    setIsAddingFolder(false);
    setIsAddingFile(false);
  };

  // 操作回调函数
  const handleAddFile = (keys: Array<Number>) => {
    console.log(keys);
  };
  const handleAddFolder = (keys: Array<Number>) => {
    console.log(keys);
  };
  const handleRemove = (keys: Array<Number>) => {
    console.log(keys);
  };

  return (
    <div>
      <Header headerConfig={headerConfig} blog={blog} />
      <Aside asideConfig={asideConfig} blog={blog} />
      <Footer footerConfig={footerConfig} content={footerContent} />

      {/* 配置窗口 */}
      <Drawer
        visible={showConfig}
        onClose={() => setShowConfig(false)}
        title="配置网站"
        width={800}
      >
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
      </Drawer>

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
