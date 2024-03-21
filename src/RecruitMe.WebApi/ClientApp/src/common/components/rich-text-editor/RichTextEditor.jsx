import {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import {withHistory} from "slate-history";
import {Space} from "antd";
import {Editable, withReact, Slate} from "slate-react";
import {Transforms, createEditor} from "slate";
import ElementFormator from "./component/element-formator/ElementFormator";
import LeafFormator from "./component/leaf-formator/LeafFormator";
import styles from "./RichTextEditor.module.scss";

import BlockButton from "./component/block-button/BlockButton";
import MarkButton from "./component/mark-button/MarkButton";
import {HOTKEYS, toggleMark} from "./RichTextEditor.utils";
import BlockSelect from "./component/block-select/BlockSelect";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  MenuOutlined,
  OrderedListOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import isHotkey from "is-hotkey";

const RichText = forwardRef((props, ref) => {
  const renderElement = useCallback(
    (renderProps) => <ElementFormator {...renderProps} />,
    []
  );
  const renderLeaf = useCallback(
    (renderProps) => <LeafFormator {...renderProps} />,
    []
  );
  const editorRef = useRef();
  const [reRender, setRender] = useState(false);
  if (!editorRef.current) {
    editorRef.current = withHistory(withReact(createEditor()));
  }

  const editor = editorRef.current;
  const theKey = [
    "children",
    "fontSize",
    "type",
    "text",
    "italic",
    "strikethrough",
    "underline",
    "bold",
    "align",
  ];
  const filterAndReplaceHTML = (data) => {
    if (data && typeof data === "object") {
      if (Array.isArray(data)) {
        return data.map((item) => filterAndReplaceHTML(item));
      } else {
        return Object.fromEntries(
          Object.entries(data).map(([k, v]) => {
            let tempKey = k;
            if (k === "html") {
              tempKey = "text";
            }
            if (!theKey.includes(tempKey)) {
              return ["text", ""];
            }
            return [tempKey, filterAndReplaceHTML(v)];
          })
        );
      }
    }
    return data;
  };

  useImperativeHandle(ref, () => {
    return {
      setValue: (str) => {
        if (editor.children && str) {
          Transforms.deselect(editor);
          try {
            const tempChildObject = JSON.parse(str);

            if (Number.isFinite(tempChildObject)) {
              throw new Error("tempChildObject is not a Descendant array");
            }

            editor.children = filterAndReplaceHTML(tempChildObject);
          } catch (e) {
            editor.children = [
              {
                type: "paragraph",
                align: "left",
                children: [{text: str}],
              },
            ];
          }
          setRender(!reRender);
        }
      },
      setEmpty: () => {
        if (editor.children) {
          Transforms.deselect(editor);
          editor.children = [
            {
              type: "paragraph",
              align: "left",
              children: [{text: ""}],
            },
          ];
          setRender(!reRender);
        }
      },
      getValue: () => {
        return editor.children ? JSON.stringify(editor.children) : "";
      },
      isEmpty: () => {
        if (editor.children?.length === 0) return true;
        return editor.children.every((item) => editor.isEmpty(item));
      },
    };
  });

  const onEditorBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      props.onBlur?.(e);
    }
  };

  const onEditorFocus = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      props.onFocus?.(e);
    }
  };

  return (
    <Slate
      onChange={props.onEditorChange}
      editor={editor}
      initialValue={[
        {
          type: "paragraph",
          align: "left",
          children: [{text: ""}],
        },
      ]}
    >
      <div
        className={`${styles.hcisRichText} ${
          props.isViewMode ? "is-view" : ""
        } ${props.className}`}
        data-render={reRender}
        onBlur={onEditorBlur}
        onFocus={onEditorFocus}
      >
        {!props.isViewMode && (
          <div className="button-toolbar">
            <Space wrap>
              <div className="button-group">
                <MarkButton format="bold" icon={<BoldOutlined />} />
                <MarkButton format="italic" icon={<ItalicOutlined />} />
                <MarkButton format="underline" icon={<UnderlineOutlined />} />
                <MarkButton
                  format="strikethrough"
                  icon={<StrikethroughOutlined />}
                />
              </div>
              <div className="button-group">
                <BlockButton format="left" icon={<AlignLeftOutlined />} />
                <BlockButton format="center" icon={<AlignCenterOutlined />} />
                <BlockButton format="right" icon={<AlignRightOutlined />} />
                <BlockButton format="justify" icon={<MenuOutlined />} />
              </div>
              <div className="button-group">
                <BlockButton
                  format="numbered-list"
                  icon={<OrderedListOutlined />}
                />
                <BlockButton
                  format="bulleted-list"
                  icon={<UnorderedListOutlined />}
                />
              </div>
              <div>
                <BlockSelect></BlockSelect>
              </div>
            </Space>
          </div>
        )}
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className={`rich-content hcis-scrollbar`}
          spellCheck
          readOnly={props.isViewMode ?? false}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                if (mark) {
                  toggleMark(editor, mark);
                }
              }
            }
          }}
        />
      </div>
    </Slate>
  );
});
RichText.displayName = "RichText";
export default RichText;
