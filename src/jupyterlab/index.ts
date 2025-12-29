/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { JupyterFrontEnd, JupyterFrontEndPlugin, ILayoutRestorer, JupyterLab } from '@jupyterlab/application';
import { MainAreaWidget, ICommandPalette, WidgetTracker } from '@jupyterlab/apputils';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { ILauncher } from '@jupyterlab/launcher';
import icon from '@datalayer/icons-react/data2/EyesIconJupyterLab';
import { requestAPI } from './handler';
import { JupyterViewerWidget } from './widget';
import viewerPlugin from './viewer/plugin';

import '../../style/index.css';

/**
 * The command IDs used by the plugin.
 */
namespace CommandIDs {
  export const create = 'create-jupyter-viewer-widget';
}

/**
 * Initialization data for the @datalayer/jupyter-viewer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@datalayer/jupyter-viewer:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  optional: [ISettingRegistry, ILauncher, ILayoutRestorer],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    settingRegistry?: ISettingRegistry,
    launcher?: ILauncher,
    restorer?: ILayoutRestorer,
  ) => {
    const { commands } = app;
    const command = CommandIDs.create;
    const tracker = new WidgetTracker<MainAreaWidget<JupyterViewerWidget>>({
      namespace: 'jupyter-viewer',
    });
    if (restorer) {
      void restorer.restore(tracker, {
        command,
        name: () => 'jupyter-viewer',
      });
    }
    commands.addCommand(command, {
      caption: 'Show Jupyter Viewer',
      label: 'Jupyter Viewer',
      icon,
      execute: () => {
        const content = new JupyterViewerWidget(app as JupyterLab);
        const widget = new MainAreaWidget<JupyterViewerWidget>({ content });
        widget.title.label = 'Jupyter Viewer';
        widget.title.icon = icon;
        app.shell.add(widget, 'main');
        tracker.add(widget);
      }
    });
    const category = 'Datalayer';
    palette.addItem({ command, category });
    const settingsUpdated = (settings: ISettingRegistry.ISettings) => {
      const showInLauncher = settings.get('showInLauncher').composite as boolean;
      if (launcher && showInLauncher) {
        launcher.add({
          command,
          category,
          rank: 2.5,
        });
      }
    };
    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log(`${plugin.id} settings loaded:`, settings.composite);
          settingsUpdated(settings);
          settings.changed.connect(settingsUpdated);
        })
        .catch(reason => {
          console.error(`Failed to load settings for ${plugin.id}`, reason);
        });
    }
    requestAPI<any>('config')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `Error while accessing the jupyter server jupyter_viewer extension.\n${reason}`
        );
      }
    );
    console.log('JupyterLab plugin @datalayer/jupyter-viewer:plugin is activated.');
  }
};

export default [
  plugin,
  viewerPlugin,
];
