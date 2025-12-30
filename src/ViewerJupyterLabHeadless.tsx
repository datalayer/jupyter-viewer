/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { JupyterLabApp, JupyterLabAppAdapter } from '@datalayer/jupyter-react';

import * as lightThemeExtension from '@jupyterlab/theme-light-extension';
import * as viewerExtension from './jupyterlab/index';
// import * as collaborationExtension from '@jupyter/collaboration-extension';

import { Viewer } from './views/Viewer';

const ThemeGlobalStyle = createGlobalStyle<any>`
  body {
    background-color: white !important;
    overflow-y: auto;
  }
`

const JupyterLabHeadless = () => {
  const [jupyterLabAppAdapter, setJupyterLabAppAdapter] = useState<JupyterLabAppAdapter>();
  const onJupyterLab = (jupyterLabAppAdapter: JupyterLabAppAdapter) => {
    setJupyterLabAppAdapter(jupyterLabAppAdapter);
  }
  return (
    <>
      {jupyterLabAppAdapter && <Viewer adapter={jupyterLabAppAdapter} />}
      <JupyterLabApp
        plugins={[
          lightThemeExtension,
          viewerExtension,
//          collaborationExtension,
        ]}
        headless={true}
        onJupyterLab={onJupyterLab}
      />
    </>
  )
}

export const ViewerJupyterLabHeadless = () => (
  <>
    <ThemeGlobalStyle />
    <JupyterLabHeadless/>
  </>
)

export default ViewerJupyterLabHeadless;
