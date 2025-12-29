/*
 * Copyright (c) 2021-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/*
 * Copyright (c) 2021-2024 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ActionList } from '@primer/react';

export type NotebookExample = {
  title: string;
  url: string;
}

export const visualisations: NotebookExample[] = [
  {
    title: "Plotly Daily Stocks",
    url: "https://raw.githubusercontent.com/datalayer-examples/notebooks/main/daily-stock.ipynb",
  },
  {
    title: "Matplotlib",
    url: "https://raw.githubusercontent.com/anissa111/matplotlib-tutorial/main/notebooks/01-basic-matplotlib-tutorial.ipynb",
  },
  /*{
    title: "Bicycle Control",
    url: "https://raw.githubusercontent.com/plotly/IPython-plotly/master/notebooks/bicycle_control/bicycle_control.ipynb",
  },*/
  {
    title: "IPyWidgets Example",
    url: " https://raw.githubusercontent.com/jupyter-widgets/ipywidgets/main/docs/source/examples/Widget%20Basics.ipynb",
  },
]

export const dataSciences: NotebookExample[] = [
  {
    title: "Fair Experiment",
    url: "https://raw.githubusercontent.com/datalayer-courses/foundations-of-data-science-with-python/main/04-probability1/fair-experiments.ipynb",
  },
  {
    title: "Text Vectorization",
    url: "https://raw.githubusercontent.com/datalayer-courses/python-text-mining-intro/main/4-text-vectorization.ipynb",
  },
  /*{
    title: "Survival Analysis",
    url: "https://raw.githubusercontent.com/plotly/IPython-plotly/master/notebooks/survival_analysis/survival_analysis.ipynb",
  },*/
]

export const astronomies: NotebookExample[] = [
  {
    title: "Center of Mass",
    url: "https://raw.githubusercontent.com/JuanCab/AstroInteractives/master/Interactives/Center_of_Mass.ipynb",
  },
  /*
  {
    title: "Propagation Effects",
    url: "https://raw.githubusercontent.com/ratt-ru/fundamentals_of_interferometry/master/7_Observing_Systems/7_7_propagation_effects.ipynb",
  },
  */
]

type MenuLineProps = {
  notebookExample: NotebookExample,
  setNotebookExample: React.Dispatch<React.SetStateAction<NotebookExample>>,
  icon: JSX.Element,
}

export const MenuLine = (props: MenuLineProps) => {
  const { notebookExample, setNotebookExample, icon } = props;
  return (
    <ActionList.Item onSelect={e => setNotebookExample(notebookExample)}>
    <ActionList.LeadingVisual>
      {icon}
    </ActionList.LeadingVisual>
    <ActionList.Description variant="block">
      {notebookExample.url}
    </ActionList.Description>
    {notebookExample.title}
  </ActionList.Item>
  )
}
