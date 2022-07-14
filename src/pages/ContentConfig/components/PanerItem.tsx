import React, { MouseEventHandler } from "react";
import {
  DeleteOutlined,
  FileOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

export default function PanerItem({
  text,
  isPage,
  className,
  handleAddFile,
  handleAddFolder,
  handleRemove,
}: {
  text: string;
  isPage?: boolean;
  className: string;
  handleAddFile?: MouseEventHandler<HTMLSpanElement>;
  handleAddFolder?: MouseEventHandler<HTMLSpanElement>;
  handleRemove: MouseEventHandler<HTMLSpanElement>;
}) {
  return (
    <div className="panerl-item">
      <p className={className}>{text}</p>
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
