import { Cosmograph } from '@cosmograph/cosmograph'
import * as fs from 'node:fs'
import { GraphMLParser } from 'graphml-js'

const filePath = 'C:/Users/isisu/OneDrive/NodeJs/GraphVisualisation/graph_pruned.graphml'; 

let graphml_graph;

// Read the file
try {
  const xmlContent = fs.readFileSync(filePath, 'utf8');
  
  // Create a new parser
  const parser = new GraphMLParser();
  
  // Parse the GraphML content
  parser.parse(xmlContent, (error, graphml_graph) => {
    if (error) {
      console.error('Error parsing GraphML:', error);
      return;
    }
    
    // Successfully parsed
    console.log(`Loaded graph with ${graph.nodes.length} nodes and ${graph.edges.length} edges`);
    
    // Display a sample of the data
    if (graph.nodes.length > 0) {
      console.log('First node:', graph.nodes[0]);
    }
    
    if (graph.edges.length > 0) {
      console.log('First edge:', graph.edges[0]);
    }
  });
} catch (error) {
  console.error('Error reading or processing file:', error);
}

// Function to display the graph

function display(){
    
    const div = document.querySelector('div')
    const config = {
    spaceSize: 4096,
    simulationFriction: 0.1, // keeps the graph inert
    simulationGravity: 0, // disables gravity
    simulationRepulsion: 0.5, // increases repulsion between points
    curvedLinks: true, // curved links
    fitViewDelay: 1000, // wait 1 second before fitting the view
    fitViewPadding: 0.3, // centers the graph width padding of ~30% of screen
    disableRescalePositions: false, // rescale positions
    enableDrag: true, // enable dragging points
    onClick: pointIndex => { console.log('Clicked point index: ', pointIndex) },
    /* ... */
    }



    const cosmograph = new Cosmograph(targetElement, config)
    cosmograph.setData(
        graphml_graph.nodes.map(
            (node)=>{return node._id}
        ), 
        graphml_graph.edges.map(
            (edge)=>{
                return {source: edge._source, target: edge._target}
            }
        )
    )
    cosmograph.render()

}

display();