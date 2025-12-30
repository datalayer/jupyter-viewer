/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState } from 'react';
import { PageHeader, Label, Text, Link as PrimerLink } from '@primer/react';
import { Box } from '@datalayer/primer-addons';
import { DatalayerIcon } from '@datalayer/icons-react';
import { ECharlesIcon } from '@datalayer/icons-react/eggs';

type Props = {
  version: string;
}

export const ViewerAbout = (props: Props): JSX.Element => {
  const { version } = props;
  const [egg, setEgg] = useState(false);
  return (
    <>
      <PageHeader as="h2">🪐 👀 Jupyter Viewer{ version && <Label sx={{marginLeft: 1}}>{version}</Label>}</PageHeader>
      <Box>
        <Text>A revisited NbViewer as a modern Web application to view Jupyter notebooks.</Text>
      </Box>
      <Box mt={3}>
        {!egg ? (
          <img
            src="https://raw.githubusercontent.com/datalayer/icons/refs/heads/main/svg/data1/jupyter-base-name.svg"
            onClick={e => setEgg(true)}
            style={{ width: 300 }}
          />
        ) : (
          <ECharlesIcon size={300} onClick={e => setEgg(false)} />
        )}
      </Box>
      <Box mt={6} pt={3} sx={{ borderTop: '1px solid var(--borderColor-default)' }}>
        <Box display="flex" alignItems="center">
          <DatalayerIcon size={32} colored style={{ marginRight: '12px' }} />
          <Box>
            <Text as="div" sx={{ fontWeight: 600 }}>
              <PrimerLink href="https://datalayer.ai" target="_blank" rel="noreferrer">
                Datalayer, Inc.
              </PrimerLink>
            </Text>
            <Text as="div" sx={{ fontSize: '0.875rem', color: 'var(--fgColor-muted)' }}>
              AI Agents for Data Analysis
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ViewerAbout;
