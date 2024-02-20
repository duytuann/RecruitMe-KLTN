import {createContext, useContext, useState} from "react";
import PropTypes from "prop-types";

export const LoadingContext = createContext({
  isLoading: false,
  showLoading: () => 1,
  closeLoading: () => 1,
});

export const LoadingProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };
  const closeLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{isLoading: loading, showLoading, closeLoading}}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};

export const LoadingConsumer = LoadingContext.Consumer;

export const useLoading = () => useContext(LoadingContext);

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
