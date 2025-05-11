import { Cosmograph } from '@cosmograph/cosmograph';

function parse_graph(graphml) {
	// Read the file
	try {
		// Create a new parser
		const parser = new DOMParser();
		const doc = parser.parseFromString(graphml, "application/xml");

		const nodes = doc.getElementsByTagName("node");
		const edges = doc.getElementsByTagName("edge");
		const graphml_graph = {
			nodes: [],
			edges: []
		};

		// Loop through the nodes and edges
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			const id = node.getAttribute("id");
			const label = node.getElementsByTagName("data")[0].textContent;
			graphml_graph.nodes.push({ _id: id, _label: label });
		}
		for (let i = 0; i < edges.length; i++) {
			const edge = edges[i];
			const source = edge.getAttribute("source");
			const target = edge.getAttribute("target");
			graphml_graph.edges.push({ _source: source, _target: target });
		}

		render_graph(graphml_graph);
	} catch (error) {
		console.error('Error reading or processing file:', error);
	}
}

// Function to display the graph

function render_graph(graphml_graph) {

	const div = document.getElementById('graph_container')
	const config = {
		spaceSize: 16384,
		simulationFriction: 0.1, // keeps the graph inert
		simulationGravity: 0.01, // disables gravity
		simulationRepulsion: 3, // increases repulsion between points
		curvedLinks: true, // curved links
		fitViewDelay: 1000, // wait 1 second before fitting the view
		fitViewPadding: 0.3, // centers the graph width padding of ~30% of screen
		disableRescalePositions: false, // rescale positions
		enableDrag: true, // enable dragging points
		onClick: pointIndex => { console.log('Clicked point index: ', pointIndex) },
		nodesize: 5, // size of the nodes
	}

	const cosmograph = new Cosmograph(div, config)
	cosmograph.setData(
		graphml_graph.nodes.map(
			(node) => { return {"id": node._id} }
		),
		graphml_graph.edges.map(
			(edge) => {
				return { source: edge._source, target: edge._target }
			}
		)
	)
	document.getElementById('graph_container').removeEventListener("click", (event) => {
		document.getElementById('file_input').click();
	});
}

document.addEventListener('DOMContentLoaded', () => {

	document.getElementById('graph_container').addEventListener("dragover", (event) => {
		event.stopPropagation();
		event.preventDefault();
	});
	document.getElementById('graph_container').addEventListener("dragenter", (event) => {
		event.stopPropagation();
		event.preventDefault();
	});
	// document.getElementById('graph_container').addEventListener("click", (event) => {
	// 	document.getElementById('file_input').click();
	// });
	document.getElementById('graph_container').addEventListener("drop", (event) => {
		event.stopPropagation();
		event.preventDefault();
		const files = event.dataTransfer.files;
		if (files.length > 0) {
			const file = files[0];
			// Check if the file is a GraphML file
			if (!file.name.endsWith('.graphml')) {
				return;
			}
			const reader = new FileReader();
			reader.onload = function (event) {
				parse_graph(event.target.result);
			};
			reader.readAsText(file);
		}
	});
	document.getElementById('file_input').addEventListener("change", (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function (event) {
				parse_graph(event.target.result);
			};
			reader.readAsText(file);
		}
	});
})