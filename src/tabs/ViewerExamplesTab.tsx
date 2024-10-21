import { useState } from 'react';
import { Box, ActionMenu, ActionList } from '@primer/react';
import { NetworkIcon, JupyterBaseIcon, JupiterIcon, ScientistIcon } from '@datalayer/icons-react';
import { Jupyter } from '@datalayer/jupyter-react/lib/jupyter/Jupyter';
import { Viewer } from '@datalayer/jupyter-react/lib/components/viewer/Viewer';
import { visualisations, astronomies, dataSciences, MenuLine, NotebookExample } from './notebooks/Examples';

export const ViewerExamplesTab = () => {
  const [notebookExample, setNotebookExample] = useState<NotebookExample>(visualisations[0]);
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
                <ActionList.GroupHeading>
                  Visualisations
                </ActionList.GroupHeading>
                <ActionList.Group>
                  {visualisations.map(visualisation => 
                    <MenuLine notebookExample={visualisation} icon={<NetworkIcon colored/>} setNotebookExample={setNotebookExample} />)}
                </ActionList.Group>
                <ActionList.GroupHeading>
                  Data Science
                </ActionList.GroupHeading>
                <ActionList.Group>
                  {dataSciences.map(dataScience => 
                    <MenuLine notebookExample={dataScience} icon={<ScientistIcon colored/>} setNotebookExample={setNotebookExample} />)}
                </ActionList.Group>
                <ActionList.GroupHeading>
                Astronomy
                </ActionList.GroupHeading>
                <ActionList.Group>
                  {astronomies.map(astronomy => 
                    <MenuLine notebookExample={astronomy} icon={<JupiterIcon colored/>} setNotebookExample={setNotebookExample} />)}
                </ActionList.Group>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>
          <Viewer nbformatUrl={notebookExample.url} outputs={false} />
        </Jupyter>
      </Box>
    </>
  )
}

export default ViewerExamplesTab;
