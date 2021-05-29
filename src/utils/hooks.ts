//封装的hooks

import { useDebounceFn } from "ahooks";
import { useEffect, useState } from "react";

/**
 * 页面滚动防抖
 * @param wait 防抖时间，单位毫秒，默认500毫秒
 */
export const useDebounceWindowScroll = (wait: number = 500) => {
  const [top, setTop] = useState<number>(0);
  //回调函数添加防抖功能
  const { run } = useDebounceFn(
    (e: Event) => {
      setTop((e.target as any).scrollTop);
    },
    {
      wait,
    }
  );

  useEffect(() => {
    //捕捉滚动条滚动,加上true避免捕捉不到
    window.addEventListener("scroll", run, true);
    return () => {
      window.removeEventListener("scroll", run, true);
    };
  }, [run]);

  return [top];
};
