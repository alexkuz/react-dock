declare module "react-dock" {
  import PropTypes, { InferProps } from "prop-types";
  import Dock from "./Dock";

  type DockProps = InferProps<typeof Dock.propTypes, typeof Dock.defaultPropTypes>;
  export default class Dock extends React.Component<DockProps, any> {}
}
