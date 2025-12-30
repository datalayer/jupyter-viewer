/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { JupyterLabApp } from '@datalayer/jupyter-react';

import * as lightThemeExtension from '@jupyterlab/theme-light-extension';
import * as viewerExtension from './jupyterlab/index';
// import * as collaborationExtension from '@jupyter/collaboration-extension';

const JupyterLabAppComponent = () => (
  <JupyterLabApp
    plugins={[
      lightThemeExtension,
      viewerExtension,
//      collaborationExtension,
    ]}
    position="absolute"
    height="100vh"    
  />
)

export const ViewerJupyterLab = () => (
  <>
    <JupyterLabAppComponent/>
  </>
)

export default ViewerJupyterLab;
