/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/// <reference types="webpack-env" />

import { createRoot } from 'react-dom/client';
import ViewerRoutes from './ViewerRoutes';

import "./../style/index.css";

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div)

if (module.hot) {
  module.hot.accept('./ViewerRoutes', () => {
    const ViewerRoutes = require('./ViewerRoutes').default;
    root.render(<ViewerRoutes/>);
  })
}

root.render(<ViewerRoutes />);
