# Copyright (c) 2021-2025 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

"""The Jupyter Viewer Server application."""

import os

from traitlets import Unicode

from jupyter_server.utils import url_path_join
from jupyter_server.extension.application import ExtensionApp, ExtensionAppJinjaMixin
from jupyter_server.base.handlers import FileFindHandler

from jupyterlab_server.config import get_page_config

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
        page_config = self.serverapp.web_app.settings.setdefault("page_config_data", {})
        page_config.update(get_page_config(
            labextensions_path=self.serverapp.web_app.settings.get("labextensions_path", []),
            logger=self.log
        ))
        httpUrl = self.serverapp.public_url.rstrip('/')
        wsUrl = httpUrl.replace('https://', 'wss://').replace('http://', 'ws://')
        fullStaticUrl = url_path_join(self.serverapp.base_url, "static", self.name)
        page_config.setdefault("token", self.serverapp.identity_provider.token)
        page_config.setdefault("baseUrl", self.serverapp.base_url)
        page_config.setdefault("httpUrl", httpUrl)
        page_config.setdefault("wsUrl", wsUrl)
        page_config.setdefault("fullStaticUrl", fullStaticUrl)
        self.serverapp.jinja_template_vars.update({
            "jupyter_viewer_version": __version__,
            "page_config": page_config,
        })

    def initialize_handlers(self):
        self.log.debug("Jupyter Viewer Config {}".format(self.settings['jupyter_viewer_jinja2_env']))
        handlers = [
            (url_path_join(self.name, "config"), ConfigHandler),
            (r"/jupyter_viewer/(.+)$", IndexHandler),
            (r"/jupyter_viewer/?", IndexHandler),
            # Serve static files at /static/jupyter_viewer/ to match webpack publicPath
            (
                url_path_join("static", self.name, "(.*)"),
                FileFindHandler,
                {"path": DEFAULT_STATIC_FILES_PATH, "no_cache_paths": ["/"]},
            ),
        ]
        self.handlers.extend(handlers)


# -----------------------------------------------------------------------------
# Main entry point
# -----------------------------------------------------------------------------

main = launch_new_instance = JupyterViewerExtensionApp.launch_instance
