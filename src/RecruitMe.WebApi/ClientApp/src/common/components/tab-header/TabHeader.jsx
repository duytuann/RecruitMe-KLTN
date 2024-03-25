import styles from "./TabHeader.module.scss";
import SearchHeader from "./SearchHeader";
import {useEffect, useRef} from "react";

const TabHeader = (props) => {
  const searchRef = useRef(null);
  const {tabList, tabClick, search} = props;
  const tabChange = (data) => {
    tabClick(data?.index ?? 0);
  };

  useEffect(() => {
    searchRef.current?.clearSearch();
  }, [props.clear]);

  return (
    <div className={styles.tabHeader}>
      <div className={styles.tabHeader__inner}>
        <div className={styles.tabHeader__nav}>
          {tabList.map((item) => (
            <div
              key={item.index}
              className={item.isActive ? "" : styles.hoverColor}
            >
              <button
                key={item.index}
                className={`divButton ${styles.tabTitle} ${item.index} ${
                  item.isActive
                    ? `${styles.activeColor}`
                    : `${styles.defaultColor}`
                } ${
                  item.isActive
                    ? `${styles.activeFontWeight}`
                    : `${styles.fontWeightNormal}`
                }`}
                onClick={() => {
                  tabChange(item);
                }}
              >
                {item.title}
                {item.isActive && <div className={styles.tabLine}></div>}
              </button>
            </div>
          ))}
        </div>
        <div className={styles.searchWrapper}>
          <SearchHeader search={search} ref={searchRef} />
        </div>
      </div>
    </div>
  );
};

export default TabHeader;
