import { JupyterReactTheme, JupyterLabApp } from '@datalayer/jupyter-react';

import * as lightThemeExtension from '@jupyterlab/theme-light-extension';
import * as collaborationExtension from '@jupyter/collaboration-extension';
import * as viewerExtension from './jupyterlab/index';

const JupyterLabComponent = () => (
  <JupyterLabApp
    plugins={[
      lightThemeExtension,
      collaborationExtension,
      viewerExtension,
    ]}
    position="absolute"
    height="100vh"
  />
)

export const JupyterViewerJupyterLab = () => (
  <JupyterReactTheme>
    <JupyterLabComponent/>
  </JupyterReactTheme>
)

export default JupyterViewerJupyterLab;
