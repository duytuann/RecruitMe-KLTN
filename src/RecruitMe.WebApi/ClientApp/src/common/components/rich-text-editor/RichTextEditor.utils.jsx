import {
  Editor as SlateEditor,
  Transforms,
  Element as SlateElement,
} from "slate";

export const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+s": "strikethrough",
};

export const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

export const FONT_SIZE = {
  font14: "14px",
  font16: "16px",
  font18: "18px",
  font20: "20px",
  font24: "24px",
  font28: "28px",
  font32: "32px",
};

export const checkFormat = (format) => {
  if (TEXT_ALIGN_TYPES.includes(format)) {
    return "align";
  } else {
    return "type";
  }
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format, checkFormat(format));
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !SlateEditor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = {type: format, children: []};
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor, format, value = true) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    SlateEditor.removeMark(editor, format);
  } else {
    SlateEditor.addMark(editor, format, value);
  }
};

export const isBlockActive = (editor, format, blockType = "type") => {
  const {selection} = editor;
  if (!selection) return false;

  const [match] = Array.from(
    SlateEditor.nodes(editor, {
      at: SlateEditor.unhangRange(editor, selection),
      match: (n) =>
        !SlateEditor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

export const isMarkActive = (editor, format) => {
  const marks = SlateEditor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const isMarkFontSizeActive = (editor, formatValue) => {
  const marks = SlateEditor.marks(editor);
  if (marks && marks?.fontSize) {
    return marks?.fontSize === formatValue;
  }
  return false;
};
