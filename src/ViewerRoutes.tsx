/*
 * Copyright (c) 2021-2024 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JupyterViewer from './Viewer';
import ViewerGitHub from './views/ViewerGitHub';

const JupyterViewerRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JupyterViewer/>}/>
          <Route path="/jupyter_viewer*" element={<JupyterViewer/>}/>
          <Route path="/github/:account/:repo/:branch/*" element={<ViewerGitHub/>}/>
          <Route path="/jupyter_viewer/github/:account/:repo/:branch/*" element={<ViewerGitHub/>}/>
        </Routes>      
      </BrowserRouter>
    </>
  )
}

export default JupyterViewerRoutes;
