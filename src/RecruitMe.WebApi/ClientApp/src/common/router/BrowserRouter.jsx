import {useRef, useState, useLayoutEffect} from "react";
import {createBrowserHistory} from "history";
import {Router} from "react-router";

const browserHistory = createBrowserHistory({window});

const BrowserRouter = (props) => {
  const {basename, children} = props;
  const historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = browserHistory;
  }

  const history = historyRef.current;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};

export {browserHistory as history, BrowserRouter};
