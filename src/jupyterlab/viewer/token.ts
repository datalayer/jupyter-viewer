/*
 * Copyright (c) 2021-2024 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { IWidgetTracker } from '@jupyterlab/apputils';
import { Token } from '@lumino/coreutils';
import { Viewer } from './ViewerDocument';

export type IViewerTracker = IWidgetTracker<Viewer>

export const IViewerTracker = new Token<IViewerTracker>(
  '@datalayer/jupyter-dashboard:IViewerTracker'
);
