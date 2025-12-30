/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ReactWidget } from '@jupyterlab/apputils';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel } from '@jupyterlab/notebook';
import { JupyterReactTheme } from '@datalayer/jupyter-react/lib/theme/JupyterReactTheme';
import { Box } from '@datalayer/primer-addons';
import { Viewer } from './Viewer';

class ViewerWidget extends ReactWidget {
  private _context: DocumentRegistry.IContext<INotebookModel>

  constructor(context: DocumentRegistry.IContext<INotebookModel>) {
    super();
    this._context = context;
  }

  render() {
    return (
      <JupyterReactTheme>
        <Box m={3}>
          <Viewer context={this._context}/>
        </Box>
      </JupyterReactTheme>
    );
  }
}

export default ViewerWidget;
