import { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { INotebookContent } from '@jupyterlab/nbformat';
import { Box, Spinner } from '@primer/react';
import { Jupyter } from '@datalayer/jupyter-react/lib/jupyter/Jupyter';
import { Viewer } from '@datalayer/jupyter-react/lib/components/viewer/Viewer';

const ViewerGitHub = () => {
  const { account, repo, branch } = useParams();
  const location = useLocation();
  const [notebookPath, setNotebookPath] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [nbformat, setNbformat] = useState<INotebookContent>();
  useEffect(() => {
    setLoading(true);
    setNbformat(undefined);
    const notebookPath = location.pathname.replace(`/github/${account}/${repo}/${branch}`, '');
    setNotebookPath(notebookPath);
    const notebook = `https://raw.githubusercontent.com/${account}/${repo}/${branch}/${notebookPath}`;
    if (notebook) {
      fetch(notebook)
      .then(response => {
        return response.text();
      })
      .then(nb => {
        setNbformat(JSON.parse(nb));
      });
    }
    setLoading(false);
  }, []);
  return (
    <>
      <Box>
        GitHub: {account} / {repo} / {branch} {notebookPath}        
      </Box>
      <Box>
        {loading && <Spinner/>}
        {nbformat &&
          <>
            <Jupyter startDefaultKernel={false}>
             <Viewer nbformat={nbformat} outputs={false} />
            </Jupyter>
          </>
        }
      </Box>
    </>
  )
}

export default ViewerGitHub;
