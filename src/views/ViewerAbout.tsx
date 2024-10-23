import { useState } from 'react';
import { Pagehead, Label, Text, Box } from '@primer/react';
import { ECharlesIcon } from '@datalayer/icons-react/eggs';

type Props = {
  version: string;
}

export const ViewerAbout = (props: Props): JSX.Element => {
  const { version } = props;
  const [egg, setEgg] = useState(false);
  return (
    <>
      <Pagehead as="h2">🪐 👀 Jupyter Viewer{ version && <Label sx={{marginLeft: 1}}>{version}</Label>}</Pagehead>
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
    </>
  );
}

export default ViewerAbout;
