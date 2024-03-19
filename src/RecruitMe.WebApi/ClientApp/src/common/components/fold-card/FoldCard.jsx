import {useEffect, useRef, useState} from "react";
import styles from "./FoldCard.module.scss";
import Icon from "@ant-design/icons";
import GroupDownIcon from "@/common/assets/icons/GroupDownIcon";
import GroupUpIcon from "@/common/assets/icons/GroupUpIcon";

// props
// export interface IProps {
//   title?: string;
//   children?: React.ReactNode;
//   operate?: React.ReactNode;
//   className?: string;
//   titleIcon?: React.ReactNode;
//   defaultDisplay?: 'block' | 'none';
//   noDisplayBorder?: boolean;
//   open?: boolean;
//   onChange?: (open?: boolean) => void;
// }

const FoldCard = (props) => {
  const {
    title,
    children,
    operate,
    className,
    titleIcon,
    defaultDisplay = "block",
    open = true,
    onChange,
    noDisplayBorder = false,
  } = props;
  const [carConDisplay, setCarConDisplay] = useState(defaultDisplay);
  const openCurrentRef = useRef(defaultDisplay);
  // value: "block" | "none"
  const setDisPlay = (value) => {
    setCarConDisplay(value);
    openCurrentRef.current = value;
  };
  useEffect(() => {
    if (open) {
      setDisPlay("block");
    } else {
      setDisPlay("none");
    }
  }, [open]);

  const isShowCon = (e) => {
    e.stopPropagation();
    const str = carConDisplay === "block" ? "none" : "block";
    setDisPlay(str);
    onChange?.(openCurrentRef.current === "block" ? true : false);
  };

  const newClass = className ? className : "";
  return (
    <div className={styles.hcisCard}>
      <div
        className={`hcis-card-header ${
          noDisplayBorder ? "hcisNoBoderCard" : ""
        }`}
        onClick={isShowCon}
      >
        <div className="hcis-card-left">
          <div className="cardTitle hcis-two-rows">{title}</div>
          {titleIcon && <div style={{marginLeft: "0.5rem"}}>{titleIcon}</div>}
        </div>
        <div className="hcis-card-right hcis-pr-8">
          {operate ? operate : ""}
          {carConDisplay === "block" ? (
            <Icon component={GroupUpIcon} className="upIcon"></Icon>
          ) : (
            <Icon component={GroupDownIcon} className="upIcon"></Icon>
          )}
        </div>
      </div>
      <div
        className={`hcis-card-con ${newClass}`}
        style={{display: carConDisplay}}
      >
        {children}
      </div>
    </div>
  );
};

export default FoldCard;
