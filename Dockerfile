# Copyright (c) 2021-2025 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

# Copyright (c) Datalayer, Inc. https://datalayer.io
# Distributed under the terms of the MIT License.

FROM python:3.11

RUN pip install jupyter-viewer==0.0.8

EXPOSE 8888

CMD ["jupyter", "viewer", "--ip", "0.0.0.0", "--IdentityProvider.token", "", "--allow-root", "--no-browser"]
