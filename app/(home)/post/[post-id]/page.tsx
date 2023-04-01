"use client";

import {
  usePathname,
  useSearchParams,
  useSelectedLayoutSegments,
} from "next/navigation";

const PostDetail = () => {
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();
  console.log(segments);
  return <div>PostDetail: {pathname}</div>;
};

export default PostDetail;
