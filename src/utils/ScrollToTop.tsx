import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";

interface PropTypes {
  history: any;
  children: any;
}

const ScrollToTop: React.FC<PropTypes> = ({ history, children }) => {
  useEffect(() => {
    const unlistent = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unlistent();
    };
  });

  return <Fragment>{children}</Fragment>;
};

export default withRouter(ScrollToTop);
