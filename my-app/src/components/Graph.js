import React, { useEffect, useRef } from "react";
import { Sigma } from "sigma";
import Graph from "graphology"; // Importer Graphology

// Jeu de données de type graphe
const graphData = {
  nodes: [
    {
      id: "1",
      label: "Psychologie Positive",
      group: "Concept",
      x: 0,
      y: 0,
      size: 15,
      color: "#FF5733",
    },
    {
      id: "2",
      label: "Bien-être Subjectif",
      group: "Concept",
      x: 1,
      y: 1,
      size: 10,
      color: "#33FF57",
    },
    {
      id: "3",
      label: "Gratitude",
      group: "Concept",
      x: 2,
      y: 0.5,
      size: 8,
      color: "#3357FF",
    },
    {
      id: "4",
      label: "Martin Seligman",
      group: "Chercheur",
      x: 0,
      y: 2,
      size: 12,
      color: "#FFD700",
    },
    {
      id: "5",
      label: "Flow",
      group: "Concept",
      x: -1,
      y: 1,
      size: 9,
      color: "#FF33FF",
    },
    {
      id: "6",
      label: "Optimisme Appris",
      group: "Concept",
      x: -2,
      y: -1,
      size: 7,
      color: "#33FFF3",
    },
    {
      id: "7",
      label: "Mihály Csíkszentmihályi",
      group: "Chercheur",
      x: -1,
      y: -2,
      size: 11,
      color: "#FF9933",
    },
    {
      id: "8",
      label: "Résilience",
      group: "Concept",
      x: 1.5,
      y: -1,
      size: 8,
      color: "#9933FF",
    },
    {
      id: "9",
      label: "Tal Ben-Shahar",
      group: "Chercheur",
      x: -1.5,
      y: 0.5,
      size: 10,
      color: "#33FF99",
    },
    {
      id: "10",
      label: "Emotions Positives",
      group: "Concept",
      x: 2.5,
      y: -1.5,
      size: 8,
      color: "#FF9933",
    },
    {
      id: "11",
      label: "Santé Mentale",
      group: "Concept",
      x: -2.5,
      y: -2.5,
      size: 8,
      color: "#FF5733",
    },
    {
      id: "12",
      label: "Réalisation de Soi",
      group: "Concept",
      x: 3,
      y: 1,
      size: 8,
      color: "#33FF57",
    },
    {
      id: "13",
      label: "Altruisme",
      group: "Concept",
      x: 4,
      y: -2,
      size: 7,
      color: "#3357FF",
    },
    {
      id: "14",
      label: "Confiance en Soi",
      group: "Concept",
      x: -3,
      y: 2,
      size: 6,
      color: "#FFD700",
    },
    {
      id: "15",
      label: "Empathie",
      group: "Concept",
      x: 3,
      y: -3,
      size: 7,
      color: "#FF33FF",
    },
    {
      id: "16",
      label: "Espoir",
      group: "Concept",
      x: -4,
      y: -1,
      size: 9,
      color: "#FF9999",
    },
    {
      id: "17",
      label: "Engagement",
      group: "Concept",
      x: 2,
      y: -2,
      size: 10,
      color: "#99FF33",
    },
    {
      id: "18",
      label: "Forgiveness",
      group: "Concept",
      x: 0,
      y: -2.5,
      size: 7,
      color: "#33CCFF",
    },
    {
      id: "19",
      label: "Compassion",
      group: "Concept",
      x: -1.5,
      y: -1.5,
      size: 8,
      color: "#FFCC33",
    },
    {
      id: "20",
      label: "Relations Positives",
      group: "Concept",
      x: 2.5,
      y: 2,
      size: 9,
      color: "#FF33CC",
    },
  ],
  edges: [
    { id: "e1", source: "1", target: "2", weight: 2, color: "#cccccc" },
    { id: "e2", source: "1", target: "3", weight: 3, color: "#cccccc" },
    { id: "e3", source: "4", target: "5", weight: 1, color: "#cccccc" },
    { id: "e4", source: "1", target: "4", weight: 3, color: "#cccccc" },
    { id: "e5", source: "5", target: "7", weight: 2, color: "#cccccc" },
    { id: "e6", source: "6", target: "4", weight: 2, color: "#cccccc" },
    { id: "e7", source: "7", target: "9", weight: 3, color: "#cccccc" },
    { id: "e8", source: "9", target: "2", weight: 2, color: "#cccccc" },
    { id: "e9", source: "10", target: "12", weight: 1, color: "#cccccc" },
    { id: "e10", source: "3", target: "13", weight: 4, color: "#cccccc" },
    { id: "e11", source: "8", target: "16", weight: 2, color: "#cccccc" },
    { id: "e12", source: "8", target: "6", weight: 3, color: "#cccccc" },
    { id: "e13", source: "12", target: "19", weight: 2, color: "#cccccc" },
    { id: "e14", source: "15", target: "14", weight: 2, color: "#cccccc" },
    { id: "e15", source: "16", target: "17", weight: 1, color: "#cccccc" },
    { id: "e16", source: "17", target: "18", weight: 3, color: "#cccccc" },
    { id: "e17", source: "18", target: "19", weight: 2, color: "#cccccc" },
    { id: "e18", source: "20", target: "17", weight: 4, color: "#cccccc" },
    { id: "e19", source: "19", target: "1", weight: 3, color: "#cccccc" },
    { id: "e20", source: "14", target: "20", weight: 2, color: "#cccccc" },
  ],
};

const GraphComponent = () => {
  const containerRef = useRef(null); // Référence à l'élément HTML

  useEffect(() => {
    if (containerRef.current) {
      // 1. Créer une nouvelle instance de graphe avec Graphology
      const graph = new Graph();

      // 2. Ajouter les nœuds au graphe
      graphData.nodes.forEach((node) => {
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
