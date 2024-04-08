import {useEffect, useRef} from "react";
import RichText from "../../../../common/components/rich-text-editor/RichTextEditor";

const ViewRichText = ({value}) => {
  const richTextRef = useRef(null);

  useEffect(() => {
    richTextRef.current?.setValue(value?.toString() ?? "");
  }, [value]);

  return <RichText isViewMode ref={richTextRef} />;
};

export default ViewRichText;
