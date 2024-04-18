import { useState, ChangeEvent } from "react";
interface iTag {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  maxTags: number;
}

export const TagField: React.FC<iTag> = ({
  tags,
  addTag,
  removeTag,
  maxTags,
}) => {
  const [userInput, setUserInput] = useState<string>(" ");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        userInput.trim() !== "" &&
        userInput.length <= 12 &&
        tags.length < maxTags
      ) {
        addTag(userInput);
        setUserInput("");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <input
        name="keyword_tags"
        type="text"
        placeholder={
          tags.length < maxTags
            ? "Add a tag"
            : `You can only enter max. of ${maxTags} tags`
        }
        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-blue-500 focus:border-blue-500"
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
        disabled={tags.length === maxTags}
      />

      <div className="flex flex-row flex-wrap gap-3 mt-4">
        {tags.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
          >
            {tag}
            <button
              className="ml-2 hover:text-blue-500"
              onClick={() => removeTag(tag)}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagField;
