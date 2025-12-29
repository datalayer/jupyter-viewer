# Copyright (c) 2021-2025 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

import json

from .._version import __version__


async def test_config(jp_fetch):
    # When
    response = await jp_fetch("jupyter_viewer", "config")
    # Then
    assert response.code == 200
    payload = json.loads(response.body)
    assert payload == {
        "extension": "jupyter_viewer",
        "version": __version__
    }
