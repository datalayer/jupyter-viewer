# Copyright (c) 2021-2025 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

# Copyright (c) 2021-2024 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

import pytest

pytest_plugins = ("jupyter_server.pytest_plugin", )


@pytest.fixture
def jp_server_config(jp_server_config):
    return {"ServerApp": {"jpserver_extensions": {"jupyter_viewer": True}}}
