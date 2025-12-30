# Copyright (c) 2021-2025 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

from typing import Any, Dict, List

from ._version import __version__
from .serverapplication import JupyterViewerExtensionApp


def _jupyter_server_extension_points() -> List[Dict[str, Any]]:
    return [{
        "module": "jupyter_viewer",
        "app": JupyterViewerExtensionApp,
    }]

"""
def _jupyter_labextension_paths() -> List[Dict[str, str]]:
    return [{
        "src": "labextension",
        "dest": "@datalayer/jupyter-viewer"
    }]
"""
