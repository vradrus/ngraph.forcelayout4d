/**
 * This module provides all required forces to regular ngraph.physics.simulator
 * to make it 4D simulator. Ideally ngraph.physics.simulator should operate
 * with vectors, but on practices that showed performance decrease... Maybe
 * I was doing it wrong, will see if I can refactor/throw away this module.
 */
module.exports = createLayout;
createLayout.get2dLayout = require('ngraph.forcelayout');

function createLayout(graph, physicsSettings) {
  var merge = require('ngraph.merge');
  physicsSettings = merge(physicsSettings, {
        createQuadTree: require('ngraph.quadtreebh4d'),
        createBounds: require('./lib/bounds'),
        createDragForce: require('./lib/dragForce'),
        createSpringForce: require('./lib/springForce'),
        integrator: getIntegrator(physicsSettings),
        createBody: require('./lib/createBody')
      });

  return createLayout.get2dLayout(graph, physicsSettings);
}

function getIntegrator(physicsSettings) {
  if (physicsSettings && physicsSettings.integrator === 'verlet') {
    return require('./lib/verletIntegrator.js');
  }

  return require('./lib/eulerIntegrator')
}
