/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ThemeProvider, BaseStyles, Box, UnderlineNav, PageHeader, Heading, Link } from '@primer/react';
import { JupyterLabAppAdapter } from '@datalayer/jupyter-react';
import { DatalayerGreenIcon } from '@datalayer/icons-react';
import { ViewerForm, ViewerExamples, ViewerAbout } from './views';
import { requestAPI } from './jupyterlab/handler';

export type JupyterViewerProps = {
  adapter?: JupyterLabAppAdapter;
}

export const JupyterViewer = (props: JupyterViewerProps) => {
  const [tab, setTab] = useState(1);
  const [version, setVersion] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    requestAPI<any>('config')
    .then(data => {
      setVersion(data.version);
    })
    .catch(reason => {
      console.error(
        `Error while accessing the jupyter server jupyter_viewer extension.\n${reason}`
      );
    });
  });
  return (
    <Box m={3}>
      <ThemeProvider>
        <BaseStyles>
          <PageHeader>
            <Box display="flex">
              <Box mr={3}>
                <Link href="#" onClick={e => navigate('/')}>
                  <DatalayerGreenIcon size={32} colored />
                </Link>
              </Box>
              <Box mr={3}>
                <Heading>Jupyter Viewer</Heading>
              </Box>
            </Box>
          </PageHeader>
          <Box>
            <Box>
              <UnderlineNav aria-label="viewer">
                <UnderlineNav.Item aria-label="viewer-home" aria-current={tab === 1 ? "page" : undefined} onSelect={e => {e.preventDefault(); setTab(1);}}>
                  Viewer
                </UnderlineNav.Item>
                <UnderlineNav.Item aria-label="viewer-examples" aria-current={tab === 2 ? "page" : undefined} onSelect={e => {e.preventDefault(); setTab(2);}}>
                  Examples
                </UnderlineNav.Item>
                <UnderlineNav.Item aria-label="viewer-about" aria-current={tab === 3 ? "page" : undefined} onSelect={e => {e.preventDefault(); setTab(3);}}>
                  About
                </UnderlineNav.Item>
              </UnderlineNav>
            </Box>
            <Box m={3}>
              {tab === 1 && <ViewerForm />}
              {tab === 2 && <ViewerExamples />}
              {tab === 3 && <ViewerAbout version={version} />}
            </Box>
          </Box>
        </BaseStyles>
      </ThemeProvider>
    </Box>
  );
}

export default JupyterViewer;
