import {useSlate} from "slate-react";
import {isMarkActive, toggleMark} from "../../RichTextEditor.utils";

const MarkButton = (props) => {
  const editor = useSlate();
  const {format, icon} = props;
  return (
    <button
      className={`hcis-rich-btn ${
        isMarkActive(editor, format) ? "is-active" : ""
      }`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      type="button"
    >
      {icon}
    </button>
  );
};

export default MarkButton;
