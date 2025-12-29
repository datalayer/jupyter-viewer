/*
 * Copyright (c) 2021-2024 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { JupyterReactTheme, JupyterLabApp, JupyterLabAppAdapter } from '@datalayer/jupyter-react';
import { JupyterViewer } from './Viewer';

import * as lightThemeExtension from '@jupyterlab/theme-light-extension';
import * as collaborationExtension from '@jupyter/collaboration-extension';
import * as viewerExtension from './jupyterlab/index';

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
      {jupyterLabAppAdapter && <JupyterViewer adapter={jupyterLabAppAdapter}/>}
      <JupyterLabApp
        plugins={[
          lightThemeExtension,
          collaborationExtension,
          viewerExtension,
        ]}
        headless={true}
        onJupyterLab={onJupyterLab}
      />
    </>
  )
}

export const JupyterViewerJupyterLabHeadless = () => (
  <JupyterReactTheme>
    <ThemeGlobalStyle />
    <JupyterLabHeadless/>
  </JupyterReactTheme>
)

export default JupyterViewerJupyterLabHeadless;
