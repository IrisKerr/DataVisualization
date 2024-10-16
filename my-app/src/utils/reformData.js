export function reformatData(cortextData) {
  const nodes = [];
  const edges = [];

  // Reformatage des nœuds (nodes)
  for (const nodeId in cortextData.nodes) {
    const cortextNode = cortextData.nodes[nodeId];
    const colorArray = cortextNode.color.map((value) =>
      Math.round(value * 255)
    ); // Convertir les valeurs 0-1 en 0-255
    const color = `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${cortextNode.color[3]})`;

    const formattedNode = {
      id: nodeId,
      label: cortextNode.label || "No Label",
      group: cortextNode.category || "Unknown Group",
      x: cortextNode.x || 0,
      y: cortextNode.y || 0,
      size: cortextNode.size || 1,
      color: color,
    };
    nodes.push(formattedNode);
  }

  // Reformatage des liens (edges)
  for (const edgeId in cortextData.edges) {
    const cortextEdge = cortextData.edges[edgeId];

    const formattedEdge = {
      id: `e${edgeId}`,
      source: cortextEdge.source.toString(), // Convertir en chaîne de caractères si nécessaire
      target: cortextEdge.dest.toString(),
      weight: cortextEdge.weight || 1,
      color: "#cccccc", // Couleur par défaut, peut être modifiée selon des règles spécifiques
    };
    edges.push(formattedEdge);
  }

  return { nodes, edges };
}
