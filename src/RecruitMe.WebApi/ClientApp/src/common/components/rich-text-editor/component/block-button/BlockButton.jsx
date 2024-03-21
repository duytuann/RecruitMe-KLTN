import {useSlate} from "slate-react";
import {
  isBlockActive,
  checkFormat,
  toggleBlock,
} from "../../RichTextEditor.utils";

const BlockButton = (props) => {
  const editor = useSlate();
  const {format, icon} = props;
  return (
    <button
      className={`hcis-rich-btn ${
        isBlockActive(editor, format, checkFormat(format)) ? "is-active" : ""
      }`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      type="button"
    >
      {icon}
    </button>
  );
};

export default BlockButton;
