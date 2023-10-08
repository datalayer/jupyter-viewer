/// <reference types="webpack-env" />

import { createRoot } from 'react-dom/client';
import ViewerJupyterLabHeadless from './ViewerJupyterLabHeadless';

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div)

if (module.hot) {
  module.hot.accept('./ViewerJupyterLabHeadless', () => {
    const ViewerJupyterLabHeadless = require('./ViewerJupyterLabHeadless').default;
    root.render(<ViewerJupyterLabHeadless/>);
  })
}

root.render(<ViewerJupyterLabHeadless />);
