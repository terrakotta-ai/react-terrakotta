import * as React from "react";
import "../../calendly-widget.css";
import {
  PageSettings,
  Prefill,
  Utm,
  IframeTitle,
  formatCalendlyUrl,
  LoadingSpinner,
} from "../../calendly";
import CalendlyLoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export interface Props {
  url: string;
  prefill?: Prefill;
  utm?: Utm;
  pageSettings?: PageSettings;
  iframeTitle?: IframeTitle;
  LoadingSpinner?: LoadingSpinner;
}

class ModalContent extends React.Component<Props, { isLoading: boolean }> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
    };

    this.onLoad = this.onLoad.bind(this);
  }

  private onLoad() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const src = formatCalendlyUrl({
      url: "https://www.terrakotta.ai/get-started",
      pageSettings: this.props.pageSettings,
      prefill: this.props.prefill,
      utm: this.props.utm,
      embedType: "PopupWidget",
    });
    const LoadingSpinner = this.props.LoadingSpinner || CalendlyLoadingSpinner;

    return (
      <>
        {this.state.isLoading && <LoadingSpinner />}
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          title={this.props.iframeTitle || "Calendly Scheduling Page"}
          onLoad={this.onLoad}
          src={src}
        ></iframe>
      </>
    );
  }
}

export default ModalContent;
