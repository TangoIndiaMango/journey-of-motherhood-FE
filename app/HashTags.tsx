import React from "react";
import { useState } from "react";

const tagContainerStyles = `
  flex
  flex-wrap
  gap-2
  mt-4
`;

interface TagProps {
  text: string;
}

const getTagColor = ["red", "green", "blue", "yellow", "grey"];

const convertToHashtags = (tags: string) => {
  const tagArray = tags.split("\n");
  let tagIndex = 0;
  return tagArray.flatMap((tag) => {
    const sentences = tag
      .split(".")
      .filter((sentence) => sentence.trim() !== "");

    tagIndex++;
    return sentences.map((sentence, index) => (
      <span
        key={`${tagIndex}-${index}`}
        className={
          "flex items-center text-[8px] text-[black] font-bold px-2 py-[7px] w-fit rounded-sm"
        }
        style={{ background: getTagColor[index] }}
      >{`#${sentence.trim()}`}</span>
    ));
  });
};

const HashTagComponent = ({ tags }: any) => {
  return <div className={tagContainerStyles}>{convertToHashtags(tags)}</div>;
};

export default HashTagComponent;
