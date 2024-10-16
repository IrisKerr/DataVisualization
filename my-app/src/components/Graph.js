import React, { useEffect, useRef } from "react";
import { Sigma } from "sigma";
import Graph from "graphology"; // Importer Graphology
import { graphData } from "../data/GraphData";
import { CorTextData } from "../data/CorTextData";
import { reformatData } from "../utils/reformData";

const GraphComponent = () => {
  const containerRef = useRef(null); // Référence à l'élément HTML

  useEffect(() => {
    if (containerRef.current) {
      const formattedData = reformatData(CorTextData);
      // 1. Créer une nouvelle instance de graphe avec Graphology
      const graph = new Graph();

      // 2. Ajouter les nœuds au graphe
      formattedData.nodes.forEach((node) => {
        graph.addNode(node.id, {
          label: node.label,
          x: node.x,
          y: node.y,
          size: node.size,
          color: node.color,
        });
      });

      // 3. Ajouter les arêtes au graphe
      graphData.edges.forEach((edge) => {
        graph.addEdge(edge.source, edge.target, {
          color: edge.color,
        });
      });

      // 4. Initialiser Sigma avec le graphe créé
      const sigmaInstance = new Sigma(graph, containerRef.current, {
        defaultNodeColor: "#ec5148", // Couleur des nœuds par défaut
        defaultEdgeColor: "#ccc", // Couleur des arêtes par défaut
      });

      return () => {
        // Nettoyage : détruire l'instance Sigma quand le composant est démonté
        sigmaInstance.kill();
      };
    }
  }, []);

  return (
    <div>
      {/* Conteneur qui affichera le graphe Sigma */}
      <div
        ref={containerRef}
        style={{ margin: "0 auto", maxWidth: "1000px", height: "500px" }}
      />
    </div>
  );
};

export default GraphComponent;
