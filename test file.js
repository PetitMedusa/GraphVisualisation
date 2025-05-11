// CommonJS approach
const fs = require('fs');

// Log that we're starting
console.log('Starting script...');

// Check if the module exists
try {
  console.log('Checking if graphml-js module exists...');
  fs.accessSync('./C:/User/isisu/OneDrive/NodeJs/GraphVisualisation/node_modules/graphml-js/lib/index.js');
  console.log('Module exists, trying to require it...');
} catch (err) {
  console.error('Module not found:', err.message);
  process.exit(1);
}

// Try to require the module
try {
  console.log('Requiring graphml-js module...');
  const GraphMLParser = require('graphml-js');
  console.log('Successfully required GraphMLParser:', typeof GraphMLParser);
  
  // If we got here, the module was loaded successfully
  console.log('GraphMLParser loaded successfully');
} catch (err) {
  console.error('Error requiring module:', err);
}



