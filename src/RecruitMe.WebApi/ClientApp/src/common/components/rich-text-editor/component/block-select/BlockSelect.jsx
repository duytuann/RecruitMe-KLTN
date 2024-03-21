import {useSlate} from "slate-react";
import {
  isMarkFontSizeActive,
  toggleMark,
  FONT_SIZE,
} from "../../RichTextEditor.utils";
import {Select} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

const BlockSelect = () => {
  const editor = useSlate();
  const [value, setValue] = useState(Object.keys(FONT_SIZE)[0]);

  useEffect(() => {
    let defaultValue = Object.keys(FONT_SIZE)[0];

    Object.keys(FONT_SIZE).forEach((itemKey) => {
      if (isMarkFontSizeActive(editor, itemKey)) {
        defaultValue = itemKey;
      }
    });

    if (defaultValue !== value) {
      setValue(defaultValue);
    }
  });

  return (
    <Select
      suffixIcon={<CaretDownOutlined />}
      value={value}
      className={`hcis-rich-select`}
      options={Object.entries(FONT_SIZE).map(([k, v]) => ({
        label: v,
        value: k,
      }))}
      onChange={(value) => {
        setValue(value);
        toggleMark(editor, "fontSize", value);
      }}
    ></Select>
  );
};

export default BlockSelect;
