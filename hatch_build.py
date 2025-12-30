# Copyright (c) 2021-2025 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

import glob
import os

import shutil

from subprocess import check_call
from pathlib import Path

from hatchling.builders.hooks.plugin.interface import BuildHookInterface


JLPM = 'jlpm'


HERE = os.path.abspath(os.path.dirname(__file__))


def clean_dist():
    """Remove the contents of the dist folder and tsconfig.tsbuildinfo."""
    dist_path = os.path.join(HERE, 'dist')
    if os.path.exists(dist_path):
        shutil.rmtree(dist_path)
        print(f"Cleaned dist folder: {dist_path}")
    
    # Also remove tsconfig.tsbuildinfo if it exists
    # tsbuildinfo_path = os.path.join(HERE, 'tsconfig.tsbuildinfo')
    # if os.path.exists(tsbuildinfo_path):
    #     os.remove(tsbuildinfo_path)
    #     print(f"Removed tsconfig.tsbuildinfo: {tsbuildinfo_path}")


def build_javascript():
    # clean_dist()
#    if not (Path("jupyter_viewer/labextension/static/style.js")).exists():
    check_call([JLPM, 'install'], cwd=HERE)
    check_call(
        [JLPM, 'build:webpack:prod'],
        cwd=HERE,
    )
    for file in glob.glob(r'./dist/*.*'):
        shutil.copy(
            file,
            './jupyter_viewer/static/'
        )


class JupyterBuildHook(BuildHookInterface):
    def initialize(self, version, build_data):
        if self.target_name == 'editable':
            build_javascript()
        elif self.target_name == 'wheel':
            build_javascript()
        elif self.target_name == 'sdist':
            build_javascript()
