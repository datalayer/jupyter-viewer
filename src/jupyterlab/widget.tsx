/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { JupyterLab } from '@jupyterlab/application';
import { ReactWidget } from '@jupyterlab/apputils';
import { JupyterLabAppAdapter } from '@datalayer/jupyter-react';
import { Viewer } from '../views/Viewer';

export class JupyterViewerWidget extends ReactWidget {
  private _app: JupyterLab;
  constructor(app: JupyterLab) {
    super();
    this._app = app;
    this.addClass('dla-Container');
  }

  render(): JSX.Element {
    return <Viewer adapter={JupyterLabAppAdapter.create(this._app)} />;
  }
}
