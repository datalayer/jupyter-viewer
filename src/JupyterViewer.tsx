import { useState, useEffect } from 'react';
import { JupyterFrontEnd } from '@jupyterlab/application';
import { ThemeProvider, BaseStyles, Box } from '@primer/react';
import { UnderlineNav } from '@primer/react/drafts';
import { EyesIcon } from '@datalayer/icons-react';
import FormTab from './tabs/FormTab';
import ExamplesTab from './tabs/ExamplesTab';
import AboutTab from './tabs/AboutTab';
import { requestAPI } from './handler';

export type JupyterFrontEndProps = {
  app?: JupyterFrontEnd;
}

const JupyterViewer = (props: JupyterFrontEndProps) => {
  const [tab, setTab] = useState(1);
  const [version, setVersion] = useState('');
  useEffect(() => {
    requestAPI<any>('config')
    .then(data => {
      setVersion(data.version);
    })
    .catch(reason => {
      console.error(
        `Error while accessing the Jupyter Server jupyter_viewer extension..\n${reason}`
      );
    });
  });
  return (
    <>
      <ThemeProvider>
        <BaseStyles>
          <Box>
            <Box>
              <UnderlineNav>
              <UnderlineNav.Item aria-current="page" onSelect={e => {e.preventDefault(); setTab(1);}}>
                  Viewer
                </UnderlineNav.Item>
                <UnderlineNav.Item onSelect={e => {e.preventDefault(); setTab(2);}}>
                  Examples
                </UnderlineNav.Item>
                <UnderlineNav.Item icon={() => <EyesIcon colored/>} onSelect={e => {e.preventDefault(); setTab(3);}}>
                  About
                </UnderlineNav.Item>
              </UnderlineNav>
            </Box>
            <Box m={3}>
              {tab === 1 && <FormTab />}
              {tab === 2 && <ExamplesTab />}
              {tab === 3 && <AboutTab version={version} />}
            </Box>
          </Box>
        </BaseStyles>
      </ThemeProvider>
    </>
  );
}

export default JupyterViewer;
