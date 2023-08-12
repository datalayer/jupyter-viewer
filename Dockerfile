# Copyright (c) Datalayer, Inc. https://datalayer.io
# Distributed under the terms of the MIT License.

FROM python:3.11

RUN mkdir /opt/jupyter-viewer

WORKDIR /opt/jupyter-viewer

RUN pip install kazoo

COPY jupyter_viewer /opt/jupyter_viewer
RUN pip install -e ./jupyter_viewer

# COPY frontplane/dist.html /opt/jupyter-viewer/index.html

WORKDIR /opt/jupyter-viewer/editor

EXPOSE 9300

CMD ["python", "-m", "jupyter_viewer"]
