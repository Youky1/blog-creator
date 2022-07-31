import React, { MouseEventHandler } from "react";
import {
  DeleteOutlined,
  FileOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { useCurrentContent } from "../../../hooks";

interface Param {
  name: string;
  isPage?: boolean;
  className: string;
  text?: string;
  handleAddFile?: MouseEventHandler<HTMLSpanElement>;
  handleAddFolder?: MouseEventHandler<HTMLSpanElement>;
  handleRemove: MouseEventHandler<HTMLSpanElement>;
  handleEdit: Function;
}

export default function PanerItem({
  name,
  isPage,
  className,
  text,
  handleAddFile,
  handleAddFolder,
  handleRemove,
  handleEdit,
}: Param) {
  const { setCurrentContent } = useCurrentContent();
  const showCurrentContent = () => {
    setCurrentContent(text || "");
    handleEdit();
  };
  return (
    <div className="panerl-item" onClick={showCurrentContent}>
      <span className={className}>{name}</span>
      {!isPage && (
        <>
          <Tooltip overlay="创建文件夹">
            <FolderOutlined
              style={{ fontSize: 20, marginLeft: 10, color: "#C09553" }}
              onClick={handleAddFolder}
            />
          </Tooltip>
          <Tooltip overlay="创建文件">
            <FileOutlined
              style={{ fontSize: 20, marginLeft: 10, color: "#40a9ff" }}
              onClick={handleAddFile}
            />
          </Tooltip>
        </>
      )}

      <Tooltip overlay="删除">
        <DeleteOutlined
          style={{ fontSize: 20, marginLeft: 10, color: "#FE725C" }}
          onClick={handleRemove}
        />
      </Tooltip>
    </div>
  );
}
