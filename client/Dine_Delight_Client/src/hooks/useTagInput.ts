import { useState } from "react";

const useTagInput = (maxTags = 5) => {
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (newTag: string) => {
    if (newTag && !tags.includes(newTag.trim()) && tags.length < maxTags) {
      setTags([...tags, newTag]);
    }
  };

  const handleRemoveTag = (tag: string) =>
    setTags(tags.filter((t) => t !== tag));

  return { tags, setTags, handleAddTag, handleRemoveTag };
};

export default useTagInput;
