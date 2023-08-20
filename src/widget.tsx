import { JupyterFrontEnd } from '@jupyterlab/application';
import { ReactWidget } from '@jupyterlab/apputils';
import Landing from './components/Landing';

export class JupyterViewerWidget extends ReactWidget {
  private _app: JupyterFrontEnd;
  constructor(app: JupyterFrontEnd) {
    super();
    this._app = app;
    this.addClass('dla-Container');
  }

  render(): JSX.Element {
    return <Landing app={this._app} />;
  }
}
