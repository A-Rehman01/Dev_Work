import { Fragment } from "react";
import spinner from "./spinner-gif.gif";
export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </Fragment>
);
