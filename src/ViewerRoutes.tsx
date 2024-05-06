import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JupyterViewer from './Viewer';
import ViewerGitHub from './views/ViewerGitHub';

const JupyterViewerRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JupyterViewer/>}/>
          <Route path="/github/:account/:repo/:branch/*" element={<ViewerGitHub/>}/>
        </Routes>      
      </BrowserRouter>
    </>
  )
}

export default JupyterViewerRoutes;
