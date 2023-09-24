import { useState } from 'react';
import { Pagehead, Label, Text, Link, Box } from '@primer/react';
import PirateSkull2Icon from '@datalayer/icons-react/eggs/PirateSkull2Icon';

type Props = {
  version: string,
}

const AboutTab = (props: Props): JSX.Element => {
  const { version } = props;
  const [pirate, setPirate] = useState(false);
  return (
    <>
      <Pagehead>🪐 👀 Jupyter Viewer<Label sx={{marginLeft: 1}}>{version}</Label></Pagehead>
      <Box>
        <Text>A revisited NbViewer as a modern Web application to view Jupyter notebooks.</Text>
      </Box>
      <Box mt={3}>
        {!pirate ?
          <img src="https://assets.datalayer.tech/releases/datalayer-0.2.0-omalley.png" onClick={e => setPirate(true)}/>
            :
          <PirateSkull2Icon size={500} onClick={e => setPirate(false)}/>
        }
      </Box>
      <Box>
        <Link href="https://datalayer.tech/docs/releases/0.2.0-omalley" target="_blank">
          <Text as="h4">O'Malley release</Text>
        </Link>
      </Box>
      <Box>
        <Link href="https://github.com/datalayer/jupyter-viewer" target="_blank">
          <Text as="h4">Source code</Text>
        </Link>
      </Box>
    </>
  );
}

export default AboutTab;
