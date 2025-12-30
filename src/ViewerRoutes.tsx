/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Viewer } from './views/Viewer';
import { ViewerGitHub } from './views/ViewerGitHub';

export const ViewerRoutes = () => {
  return (
    <MemoryRouter future={{ v7_startTransition: true }} initialEntries={['/']} >
      <Routes>
        <Route path="/" element={<Viewer/>}/>
        <Route path="/jupyter_viewer*" element={<Viewer/>}/>
        <Route path="/github/:account/:repo/:branch/*" element={<ViewerGitHub/>}/>
        <Route path="/jupyter_viewer/github/:account/:repo/:branch/*" element={<ViewerGitHub/>}/>
      </Routes>      
    </MemoryRouter>
  )
}

export default ViewerRoutes;
