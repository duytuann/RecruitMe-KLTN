import {Input, Tooltip} from "antd";
import {useState, forwardRef, useImperativeHandle} from "react";
import styles from "./TabHeader.module.scss";

const SearchHeader = forwardRef((props, ref) => {
  const {search, placeholder = "Search by ...."} = props;
  const {Search} = Input;
  const [showTooltip, setShowToolip] = useState(false);
  const [searchValue, setSearchValue] = useState();

  const onOpenChange = (isOpen) => {
    if (searchValue && searchValue?.length > 0 && isOpen === true) {
      setShowToolip(true);
    }
    if (!isOpen) {
      setShowToolip(false);
    }
  };
  const onSearch = (value) => {
    search(value);
  };
  const clearSearch = () => {
    setSearchValue("");
  };
  useImperativeHandle(ref, () => ({clearSearch}));
  return (
    <div className={styles.searchHeader}>
      <Tooltip
        title={<div style={{color: "black"}}>{placeholder}</div>}
        color="#fff"
        open={showTooltip}
        onOpenChange={onOpenChange}
        trigger="hover"
        placement="topRight"
        overlayStyle={{maxWidth: "30%"}}
      >
        <Search
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder={placeholder}
          onSearch={onSearch}
          allowClear
          className={styles.search}
          onMouseEnter={() => setShowToolip(true)}
          onMouseLeave={() => setShowToolip(false)}
        />
      </Tooltip>
    </div>
  );
});

SearchHeader.displayName = "SearchHeader";

export default SearchHeader;
