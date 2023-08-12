import { ReactWidget } from '@jupyterlab/apputils';
import JupyterViewer from './JupyterViewer';

export class CounterWidget extends ReactWidget {
  constructor() {
    super();
    this.addClass('dla-Container');
  }

  render(): JSX.Element {
    return <JupyterViewer />;
  }
}
