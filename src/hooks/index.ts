import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { setBlog, setCurrentBlogContent } from "../redux/contentSlice";
import { cloneDeep } from "lodash";

export const useBlog = () => {
  const dispath = useDispatch();
  return {
    blog: cloneDeep(useSelector((state: RootState) => state.content.blog)),
    setBlog: (blog: Blog) => {
      dispath(setBlog(blog));
    },
  };
};

export const useCurrentContent = () => {
  const dispath = useDispatch();
  return {
    currentContent: useSelector(
      (state: RootState) => state.content.currentBlogContent
    ),
    setCurrentContent(value: string) {
      dispath(setCurrentBlogContent(value));
    },
  };
};
