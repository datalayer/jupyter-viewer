# Copyright (c) 2021-2025 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

"""The Jupyter Viewer Server application."""

import os

from traitlets import Unicode

from jupyter_server.utils import url_path_join
from jupyter_server.extension.application import ExtensionApp, ExtensionAppJinjaMixin

from ._version import __version__

from .handlers.index.handler import IndexHandler
from .handlers.config.handler import ConfigHandler


DEFAULT_STATIC_FILES_PATH = os.path.join(os.path.dirname(__file__), "./static")

DEFAULT_TEMPLATE_FILES_PATH = os.path.join(os.path.dirname(__file__), "./templates")


class JupyterViewerExtensionApp(ExtensionAppJinjaMixin, ExtensionApp):
    """The Jupyter Viewer Server extension."""

    name = "jupyter_viewer"

    extension_url = "/jupyter_viewer"

    load_other_extensions = True

    static_paths = [DEFAULT_STATIC_FILES_PATH]
    template_paths = [DEFAULT_TEMPLATE_FILES_PATH]

    config_a = Unicode("", config=True, help="Config A example.")
    config_b = Unicode("", config=True, help="Config B example.")
    config_c = Unicode("", config=True, help="Config C example.")

    def initialize_settings(self):
        self.log.debug("Jupyter Viewer Config {}".format(self.config))

    def initialize_templates(self):
        self.serverapp.jinja_template_vars.update({"jupyter_viewer_version" : __version__})

    def initialize_handlers(self):
        self.log.debug("Jupyter Viewer Config {}".format(self.settings['jupyter_viewer_jinja2_env']))
        handlers = [
            (url_path_join(self.name, "config"), ConfigHandler),
            (r"/jupyter_viewer/(.+)$", IndexHandler),
            (r"/jupyter_viewer/?", IndexHandler),
        ]
        self.handlers.extend(handlers)


# -----------------------------------------------------------------------------
# Main entry point
# -----------------------------------------------------------------------------

main = launch_new_instance = JupyterViewerExtensionApp.launch_instance
