import { useState, useEffect } from 'react';
import { INotebookContent } from '@jupyterlab/nbformat';
import { Box, ActionMenu, ActionList } from '@primer/react';
import { NetworkIcon, JupyterBaseIcon, JupiterIcon, ScientistIcon } from '@datalayer/icons-react';
import { Jupyter } from '@datalayer/jupyter-react/lib/jupyter/Jupyter';
import { Viewer } from '@datalayer/jupyter-react/lib/components/viewer/Viewer';
import { visualisations, astronomies, dataSciences, MenuLine, NotebookExample } from './notebooks/Examples';

const ViewerExamplesTab = () => {
  const [notebookExample, setNotebookExample] = useState<NotebookExample>(visualisations[0]);
  const [nbformat, setNbformat] = useState<INotebookContent>();
  useEffect(() => {
    fetch(notebookExample.url)
      .then(response => {
        return response.text();
      })
      .then(nbformat => {
//        const nbformat = nb.replaceAll('\\n', '');
        setNbformat(JSON.parse(nbformat));
      });
  }, [notebookExample]);
  return (
    <>
      <Box m={3}>
        <Jupyter startDefaultKernel={false}>
          <ActionMenu>
            <ActionMenu.Button leadingVisual={() => <JupyterBaseIcon colored/>}>
              Notebooks
            </ActionMenu.Button>
            <ActionMenu.Overlay>
              <ActionList showDividers>
                <ActionList.Group title="Visualisations">
                  {visualisations.map(visualisation => 
                    <MenuLine notebookExample={visualisation} icon={<NetworkIcon colored/>} setNotebookExample={setNotebookExample} />)}
                </ActionList.Group>
                <ActionList.Group title="Data Science">
                  {dataSciences.map(dataScience => 
                    <MenuLine notebookExample={dataScience} icon={<ScientistIcon colored/>} setNotebookExample={setNotebookExample} />)}
                </ActionList.Group>
                <ActionList.Group title="Astronomy">
                  {astronomies.map(astronomy => 
                    <MenuLine notebookExample={astronomy} icon={<JupiterIcon colored/>} setNotebookExample={setNotebookExample} />)}
                </ActionList.Group>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>
          { nbformat && <Viewer nbformat={nbformat} outputs={false} /> }
        </Jupyter>
      </Box>
    </>
  )
}

export default ViewerExamplesTab;
