import React from "react";
import Graph from "./components/Graph"; // Importer le composant Graph

function App() {
  return (
    <div className="App">
      <h1 className="app-title" style={{ textAlign: "center" }}>
        Graph Visualization with Sigma.js
      </h1>
      {/* Afficher le composant Graph */}
      <Graph />
    </div>
  );
}

export default App;
