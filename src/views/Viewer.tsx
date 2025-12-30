/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState, useEffect } from 'react';
import { UnderlineNav, PageHeader } from '@primer/react';
import { Box } from '@datalayer/primer-addons';
import { JupyterLabAppAdapter } from '@datalayer/jupyter-react';
import { EyesIcon } from '@datalayer/icons-react';
import { requestAPI } from '../jupyterlab/handler';
import { ViewerForm, ViewerExamples, ViewerAbout } from '.';

export type ViewerProps = {
  adapter?: JupyterLabAppAdapter;
}

// Internal component that uses hooks (must be inside Router context)
export const Viewer = (props: ViewerProps) => {
  const [tab, setTab] = useState(1);
  const [version, setVersion] = useState('');
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
      <PageHeader role="banner" aria-label="Jupyter Viewer">
        <PageHeader.TitleArea>
          <PageHeader.LeadingVisual>
            <EyesIcon size={32} />
          </PageHeader.LeadingVisual>
          <PageHeader.Title>Jupyter Viewer</PageHeader.Title>
        </PageHeader.TitleArea>
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
    </Box>
  );
}

export default Viewer;
