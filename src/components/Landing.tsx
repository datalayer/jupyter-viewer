import { useState, useEffect } from 'react';
import { JupyterFrontEnd } from '@jupyterlab/application';
import { ThemeProvider, BaseStyles, Box } from '@primer/react';
import { UnderlineNav } from '@primer/react/drafts';
import { EyesIcon } from '@datalayer/icons-react';
import AboutTab from './tabs/AboutTab';
import MainTab from './tabs/MainTab';
import { requestAPI } from '../handler';

export type JupyterFrontEndProps = {
  app?: JupyterFrontEnd;
}

const Landing = (props: JupyterFrontEndProps) => {
  const { app } = props;
  const [tab, setTab] = useState(1);
  const [version, setVersion] = useState('');
  useEffect(() => {
    requestAPI<any>('get_config')
    .then(data => {
      setVersion(data.version);
    })
    .catch(reason => {
      console.error(
        `The Jupyter Server jupyter_viewer extension appears to be missing.\n${reason}`
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
                <UnderlineNav.Item aria-current="page" icon={() => <EyesIcon colored/>} onSelect={e => {e.preventDefault(); setTab(1);}}>
                  JupyterViewer
                </UnderlineNav.Item>
                <UnderlineNav.Item icon={() => <EyesIcon colored/>} onSelect={e => {e.preventDefault(); setTab(2);}}>
                  About
                </UnderlineNav.Item>
              </UnderlineNav>
            </Box>
            <Box m={3}>
              {tab === 1 && app && <MainTab app={app} />}
              {tab === 2 && <AboutTab version={version} />}
            </Box>
          </Box>
        </BaseStyles>
      </ThemeProvider>
    </>
  );
}

export default Landing;
