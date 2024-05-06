[![Datalayer](https://assets.datalayer.tech/datalayer-25.svg)](https://datalayer.io)

[![Become a Sponsor](https://img.shields.io/static/v1?label=Become%20a%20Sponsor&message=%E2%9D%A4&logo=GitHub&style=flat&color=1ABC9C)](https://github.com/sponsors/datalayer)

# 🪐 👀 Jupyter Viewer

> A revisited [NbViewer](https://nbviewer.org) as a modern Web application to view Jupyter notebooks.

[NbViewer](https://nbviewer.org) is built on top of the [GitHub nbviewer repository](https://github.com/jupyter/nbviewer) and has been an attraction point for many data scientists since years.

Jupyter Viewer takes over the concept of easy visualisation and brings it to the Web application developers with React.js components to render Notebooks without any Kernel. It is also available as JupyterLab extension.

If needed, Users can then connect the static view o a Kernel and make it even more interactive.

## Usage

This repository packages the [Jupyter UI Viewer](https://jupyter-ui.datalayer.tech/docs/components/viewer) component as a JupyterLab extension. Install and launch with the following commands (you will need Python installed on your machine).

```bash
pip install jupyter_viewer
jupyter viewer
```

After launching, enjoy the 👀 views on http://localhost:8888/jupyter_viewer (served by Jupyter).

<div align="center" style="text-align: center">
  <img alt="Jupyter Viewer" src="https://datalayer-jupyter-examples.s3.amazonaws.com/jupyter-viewer.gif" />
</div>

You can ask to view a Notebook hosted on GitHub. 

```bash
# Apply the following pattern:
# open http://localhost:8888/github/{account}/{repo}/{branch}/{path}
# For example...
open http://localhost:8888/github/datalayer/examples/main/pytorch-gpu/pytorch-gpu-example.ipynb
```

## Develop

```bash
yarn
yarn build
# open http://localhost:3063
yarn start
```

Browse http://localhost:3063 (served by Webpack).

```bash
open http://localhost:3063
open http://localhost:3063/github/datalayer/examples/main/pytorch-gpu/pytorch-gpu-example.ipynb
```

Develop the JupyterLab extension.

```bash
pip install -e .[test]
jupyter labextension develop . --overwrite
jupyter labextension list
jupyter server extension list
# open http://localhost:8888/api/jupyter/lab?token=60c1661cc408f978c309d04157af55c9588ff9557c9380e4fb50785750703da6
yarn jupyterlab
```

## Releases

Jupyter Viewer is released as a python package in [PyPI](https://pypi.org/project/jupyter-viewer).
