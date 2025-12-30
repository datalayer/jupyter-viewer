/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, BaseStyles } from '@primer/react';
import { JupyterReactTheme, JupyterLabAppAdapter } from '@datalayer/jupyter-react';
import { Viewer } from './views/Viewer';
import { ViewerGitHub } from './views/ViewerGitHub';

export type ViewerRoutesProps = {
  adapter?: JupyterLabAppAdapter;
}

export const ViewerRoutes = (props: ViewerRoutesProps) => {
  const { adapter } = props;
  return (
    <JupyterReactTheme>
      <ThemeProvider>
        <BaseStyles>
          <MemoryRouter future={{ v7_startTransition: true }} initialEntries={['/']} >
            <Routes>
              <Route path="/" element={<Viewer adapter={adapter}/>}/>
              <Route path="/jupyter_viewer*" element={<Viewer adapter={adapter}/>}/>
              <Route path="/github/:account/:repo/:branch/*" element={<ViewerGitHub />}/>
              <Route path="/jupyter_viewer/github/:account/:repo/:branch/*" element={<ViewerGitHub />}/>
            </Routes>      
          </MemoryRouter>
        </BaseStyles>
      </ThemeProvider>
    </JupyterReactTheme>
  )
}

export default ViewerRoutes;
