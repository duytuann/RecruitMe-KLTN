import {FONT_SIZE} from "../../RichTextEditor.utils";

const LeafFormator = ({attributes, children, leaf}) => {
  const defaultFontSizeKey = Object.keys(FONT_SIZE)[0];
  const style = {
    fontSize: leaf.fontSize
      ? FONT_SIZE[leaf.fontSize]
      : FONT_SIZE[defaultFontSizeKey],
  };
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return (
    <span {...attributes} style={style}>
      {children}
    </span>
  );
};
export default LeafFormator;
