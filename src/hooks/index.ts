import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { setBlog } from "../redux/contentSlice";

export const useBlog = () => {
  const dispath = useDispatch();
  return {
    blog: useSelector((state: RootState) => state.content.blog),
    setBlog: (blog: Blog) => {
      dispath(setBlog(blog));
    },
  };
};
