/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { INotebookContent } from '@jupyterlab/nbformat';
import { Button, FormControl, TextInput, Spinner, ButtonGroup, Text, Link, Label } from '@primer/react';
import { Box } from '@datalayer/primer-addons';
import { Card } from '@datalayer/primer-addons';
// import { ThreeBarsIcon } from '@primer/octicons-react';
import { FourLeafCloverIcon, JupyterIcon } from '@datalayer/icons-react';
import { JupyterReactTheme } from '@datalayer/jupyter-react/lib/theme/JupyterReactTheme';
import { Viewer } from '@datalayer/jupyter-react/lib/components/viewer/Viewer';
import Masonry from 'react-layout-masonry';

import { visualisations, NotebookExample } from './notebooks/Examples';

type CardContent = {
  category: string;
  title: string;
  description: string;
  notebookUrl: string;
  imageUrl: string;
  viewRoute: string;
}

const cards: CardContent[] = [
  {
    category: 'Language',
    title: 'IPython Kernel',
    description: 'IPython provides extensions to the Python programming language that make working interactively convenient and efficient. These extensions are implemented in the IPython Kernel and are available in all of the IPython Frontends (Notebook, Terminal, Console and Qt Console) when running this kernel.',
    notebookUrl: 'https://github.com/ipython/ipython/blob/6.x/examples/IPython%20Kernel/Index.ipynb',
    imageUrl: 'https://nbviewer.org/static/img/example-nb/ipython-thumb.png',
    viewRoute: '/github/ipython/ipython/6.x/examples/IPython%20Kernel/Index.ipynb',
  },
  {
    category: 'Visualization',
    title: 'XKCD plots in Matplotlib',
    description: 'This notebook originally appeared as a blog post at Pythonic Perambulations by Jake Vanderplas.',
    notebookUrl: 'https://github.com/jakevdp/jakevdp.github.io-source/blob/master/content/downloads/notebooks/XKCD_plots.ipynb',
    imageUrl: 'https://nbviewer.org/static/img/example-nb/XKCD-Matplotlib.png',
    viewRoute: '/github/jakevdp/jakevdp.github.io-source/master/content/downloads/notebooks/XKCD_plots.ipynb',
  },
  {
    category: 'Book',
    title: 'Mining the Social Web',
    description: 'Mining the Social Web (3rd Edition)! This collection of Jupyter Notebooks provides an interactive way to follow along with and explore the numbered examples from the book.',
    notebookUrl: 'https://github.com/mikhailklassen/Mining-the-Social-Web-3rd-Edition/blob/master/notebooks/Chapter%201%20-%20Mining%20Twitter.ipynb',
    imageUrl: 'https://nbviewer.org/static/img/example-nb/mining-slice.png',
    viewRoute: '/github/mikhailklassen/Mining-the-Social-Web-3rd-Edition/master/notebooks/Chapter%201%20-%20Mining%20Twitter.ipynb',
  },
]

export const ViewerForm = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [notebook, setNotebook] = useState<NotebookExample>();
  const [nbformat, setNbformat] = useState<INotebookContent>();
  const randomNotebook = () => {
    return visualisations[Math.floor(Math.random() * visualisations.length)];
  }
  useEffect(() => {
    setLoading(true);
    setNbformat(undefined);
    if (notebook) {
      fetch(notebook.url)
      .then(response => {
        return response.text();
      })
      .then(nb => {
        setNbformat(JSON.parse(nb));
      })
      .catch(() => {
        fetch(notebook.url.replace('/blob/', '/ref/heads/'))
        .then(response => {
          return response.text();
        })  
        .then(nb => {
          setNbformat(JSON.parse(nb));
        })
      });
    }
    setLoading(false);
  }, [notebook]);
  /*
  const onSelectedChange = (item: any) => {
    console.log('---', item);
  }
  */
  return (
    <>
      <Box>
        <FormControl>
          <FormControl.Label id="notebook-location">Enter the location of a Jupyter Notebook to have it rendered here</FormControl.Label>
          <TextInput
            placeholder="URL | GitHub link"
            block
            onChange={e => setInput(e.target.value)}
            onSubmit={e => setNotebook({ title: '', url: input })}
          />
          {/*
          <Autocomplete>
            <Autocomplete.Input />
            <Autocomplete.Overlay>
              <Autocomplete.Menu
                items={[
                  {text: 'Plotly Presentation', id: 0},
                  {text: 'Matplotlib', id: 1},
                  {text: 'Bicycle Control', id: 2},
                  {text: 'IPyWidgets Example', id: 3},
                ]}
                selectedItemIds={[]}
                onSelectedChange={onSelectedChange}
                aria-labelledby="notebook-location"
              />
            </Autocomplete.Overlay>
          </Autocomplete>
          */}
        </FormControl>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Button sx={{margin: 1}} onClick={e => setNotebook({ title: '', url: input })} variant="default">
          Go!
        </Button>
        <Button leadingVisual={FourLeafCloverIcon} sx={{margin: 1}} onClick={e => setNotebook(randomNotebook())} variant="default">
          I'm Feeling Lucky
        </Button>
      </Box>
      <Box>
        {loading && <Spinner/>}
        {notebook && nbformat &&
          <>
            <JupyterReactTheme>
              <Viewer nbformat={nbformat} outputs={false} />
            </JupyterReactTheme>
          </>
        }
      </Box>
      <Box mt={10} ml='10%' mr='10%'>
        <Masonry columns={{ 640: 1, 768: 2, 1024: 3, 1280: 3 }} gap={16}>
          {cards.map((card) => {
            return (
              <div style={{ maxWidth: 'fit-content', marginLeft: 'auto', marginRight: 'auto'}}>
                <Card>
                  <Card.Header
                    leadingVisual={JupyterIcon}
                    title={card.title}
                    /*
                    description={card.title}
                    action={<IconButton aria-label="Menu" onClick={() => alert("Menu")} icon={ThreeBarsIcon} />}
                    */
                  />
                  <Link href="javascript: return false;" onClick={() => navigate(card.viewRoute)}>
                    <Card.Image height={200} url={card.imageUrl}/>
                  </Link>
                  <Card.Content>
                    {/*
                    <Text display="block" fontSize={22}>Paella</Text>
                    */}
                    <Text color="fg.muted">
                      {card.description}
                    </Text>
                    <Box mt={3}>
                      <Label>{card.category}</Label>
                    </Box>
                  </Card.Content>
                  <Card.Actions>
                    <ButtonGroup>
                      <Button variant='invisible' onClick={() => navigate(card.viewRoute)}>View</Button>
                      <Button variant='invisible' onClick={() => window.open(card.notebookUrl)}>Source</Button>
                    </ButtonGroup>
                  </Card.Actions>
                </Card>
              </div>
            )
          })}
        </Masonry>
      </Box>
    </>
  )
}

export default ViewerForm;
