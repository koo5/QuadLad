export default [
  {
    // this is the "edge-node"
    selector: 'node.aux-node',
    style: {
      'width': '5',
      'height': '5',
    }
  },
  {
    selector: 'node.node',
    style: {
      'width': '50',
      'height': '50',
      'font-size': '18',
      'font-weight': 'bold',
      'content': `data(label)`,
      'text-valign': 'center',
      'text-wrap': 'wrap',
      'text-max-width': '140',
      'background-color': 'gold',
      'border-color': 'orange',
      'border-width': '3',
      'color': 'darkred'
    }
  },
  {
    selector: 'node:selected',
    style: {
      'background-color': 'darkred',
      'color': 'white',
      'border-color': 'darkred',
      'line-color': '#0e76ba',
      'target-arrow-color': '#0e76ba'
    }
  },
  {
    selector: 'edge[label]',
    style: {
      'content': `data(label)`,
    }
  },
  {
    selector: 'edge.label',
    style: {
      'line-color': 'orange',
      'target-arrow-color': 'orange'
    }
  }
]
