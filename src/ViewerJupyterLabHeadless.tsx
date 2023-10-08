import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Jupyter, JupyterLabApp, JupyterLabAppAdapter } from '@datalayer/jupyter-react';
import Viewer from './Viewer';

import * as lightThemeExtension from '@jupyterlab/theme-light-extension';
import * as collaborationExtension from '@jupyter/collaboration-extension';
import * as viewerExtension from './jupyterlab/index';

const ThemeGlobalStyle = createGlobalStyle<any>`
  body {
    background-color: white !important;
  }
`

const JupyterLabHeadless = () => {
  const [jupyterLabAppAdapter, setJupyterLabAppAdapter] = useState<JupyterLabAppAdapter>();
  const onJupyterLab = (jupyterLabAppAdapter: JupyterLabAppAdapter) => {
    setJupyterLabAppAdapter(jupyterLabAppAdapter);
  }
  return (
    <>
      {jupyterLabAppAdapter && <Viewer adapter={jupyterLabAppAdapter}/>}
      <JupyterLabApp
        extensions={[
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

export const ViewerJupyterLabHeadless = () => (
  <Jupyter startDefaultKernel={false} disableCssLoading={true} collaborative={true}>
    <ThemeGlobalStyle />
    <JupyterLabHeadless/>
  </Jupyter>
)

export default ViewerJupyterLabHeadless;
