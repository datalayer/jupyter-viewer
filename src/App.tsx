import { createRoot } from 'react-dom/client';
import Landing from './components/Landing';

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div)

root.render(<Landing/>);
