import { createRoot } from 'react-dom/client';
import JupyterViewer from './JupyterViewer';

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div)

root.render(<JupyterViewer />);
