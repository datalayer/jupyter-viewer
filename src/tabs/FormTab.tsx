import { useState, useEffect } from 'react';
import { INotebookContent } from '@jupyterlab/nbformat';
import { Box, Button, FormControl, TextInput } from '@primer/react';
import { EyesIcon, FourLeafCloverIcon } from '@datalayer/icons-react';
import { Jupyter } from '@datalayer/jupyter-react/lib/jupyter/Jupyter';
import { Viewer } from '@datalayer/jupyter-react/lib/components/viewer/Viewer';
import { visualisations, NotebookExample } from './notebooks/Examples';

const FormTab = () => {
  const [input, setInput] = useState('');
  const [notebook, setNotebook] = useState<NotebookExample>();
  const [nbformat, setNbformat] = useState<INotebookContent>();
  const randomNotebook = () => {
    return visualisations[Math.floor(Math.random() * visualisations.length)];
  }
  useEffect(() => {
    if (notebook) {
      fetch(notebook.url)
      .then(response => {
        return response.text();
      })
      .then(nb => {
        const nbformat = nb.replaceAll('\\n', '');
        setNbformat(JSON.parse(nbformat));
      });
    }
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
            placeholder='URL | GitHub link | Gist ID'
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
        <Button leadingVisual={EyesIcon} sx={{margin: 1}} onClick={e => setNotebook({ title: '', url: input })}>Go!</Button>
        <Button leadingVisual={FourLeafCloverIcon} sx={{margin: 1}} onClick={e => setNotebook(randomNotebook())}>I'm Feeling Lucky</Button>
      </Box>
      <Box>
        {notebook && nbformat &&
          <>
            <Jupyter startDefaultKernel={false}>
             <Viewer nbformat={nbformat} outputs={true} />
            </Jupyter>
          </>
        }
      </Box>
    </>
  )
}

export default FormTab;
