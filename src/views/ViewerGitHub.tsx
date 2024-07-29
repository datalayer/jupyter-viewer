import { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { Box, Spinner, Pagehead, Breadcrumbs } from '@primer/react';
import { MarkGithubIcon } from '@primer/octicons-react';
import { INotebookContent } from '@jupyterlab/nbformat';
import { DatalayerGreenIcon } from '@datalayer/icons-react';
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
    const notebookPath = location.pathname.replace("/jupyter_viewer", "").replace(`/github/${account}/${repo}/${branch}`, '');
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
    <Box m={3}>
      <Jupyter startDefaultKernel={false}>
        <Box>
          <Pagehead>
            <Box display="flex">
            <Box mr={3}>
                <DatalayerGreenIcon size={32} colored/>
              </Box>
              <Box mr={3}>
                <MarkGithubIcon size={32}/>
              </Box>
              <Box>
                <Breadcrumbs>
                  <Breadcrumbs.Item href={`https://github.com/${account}`} target="_blank" style={{fontSize: 20}}>
                    {account}
                  </Breadcrumbs.Item>
                  <Breadcrumbs.Item href={`https://github.com/${account}/${repo}`} target="_blank" style={{fontSize: 20}}>
                    {repo}
                  </Breadcrumbs.Item>
                  <Breadcrumbs.Item href={`https://github.com/${account}/${repo}/tree/${branch}`} target="_blank" style={{fontSize: 20}}>
                    {branch}
                  </Breadcrumbs.Item>
                  <Breadcrumbs.Item href={`https://github.com/${account}/${repo}/tree/${branch}/${notebookPath}`} target="_blank" style={{fontSize: 20}}>
                    {notebookPath?.replace('/', '')}
                  </Breadcrumbs.Item>
                </Breadcrumbs>
              </Box>
            </Box>
          </Pagehead>
        </Box>
        <Box>
          {loading && <Spinner/>}
          {nbformat && <Viewer nbformat={nbformat} outputs={false} />
          }
        </Box>
      </Jupyter>
    </Box>
  )
}

export default ViewerGitHub;
