import { useState } from 'react';

export default function MatriceFluxHopital() {
  // Données extraites directement du fichier CSV fourni
  const departements = [
    "Blanchisserie", "Pharmacie", "Infirmières", "Aides-soignantes", "Médecins", 
    "Cadre supérieur santé", "Accueil", "Animation", "Restauration", 
    "Kinésithérapeute", "Services Techniques", "Secrétaire", 
    "Responsable financier", "Directrice", "Ressources humaines", "Qualité/Diététicienne"
  ];

  // Matrice extraite du CSV - exactement comme dans le fichier
  const flux = [
    ["X", " ", "", "X", " ", "X", " ", " ", " ", " ", " ", " ", " ", "X", "X", "X"],
    [" ", "X", "X", "X", " ", "X", "X", " ", " ", " ", " ", " ", "X", "X", "", "X"],
    ["X", "X", "X", "X", "X", "X", "X", " ", " ", " ", " ", " ", " ", "X", "", "X"],
    ["X", "X", "X", "X", " ", "X", " ", " ", " ", " ", " ", " ", " ", "X", "", "X"],
    ["", "X", "X", "X", "X", "X", "", "", "", "X", "X", "X", "", "X", "X", "X"],
    ["X", "X", "X", "", "X", "", "X", "X", "X", "X", "X", "", "X", "X", "X", "X"],
    [" ", "", "X", "X", "X", "X", "X", "X", "X", " ", " ", " ", "X", "X", "X", "X"],
    ["", "", "X", "X", "X", "X", "X", "", "", "", "X", "X", "X", "X", "X", "X"],
    [" ", " ", "X", " ", " ", "X", "", "X", " ", " ", "X", "X", "X", "X", "X", "X"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "", " ", " ", " ", "X", "", "X"],
    ["X", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "X", "", "X", "X"],
    [" ", " ", " ", " ", "X", "X", "X", " ", " ", " ", " ", " ", "X", "X", "X", "X"],
    ["X", "X", " ", " ", "X", "X", "X", "X", "X", " ", "X", "X", "", "X", "X", "X"],
    ["X", "", "", " ", "", "X", "X", "X", "X", "", "X", "X", "X", "", "X", "X"],
    ["X", " ", "", " ", " ", "X", " ", " ", "X", " ", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", ""]
  ];

  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [showLegend, setShowLegend] = useState(true);

  // Fonction pour déterminer les statistiques
  const getStats = () => {
    // Calcul des flux sortants pour chaque département
    const outgoingFlows = flux.map(row => row.filter(cell => cell === "X").length);
    const maxOutgoing = Math.max(...outgoingFlows);
    const minOutgoing = Math.min(...outgoingFlows);
    const maxOutgoingDept = departements[outgoingFlows.indexOf(maxOutgoing)];
    const minOutgoingDept = departements[outgoingFlows.indexOf(minOutgoing)];

    // Calcul des flux entrants pour chaque département
    const incomingFlows = departements.map((_, colIndex) => 
      flux.filter((row, _) => row[colIndex] === "X").length
    );
    const maxIncoming = Math.max(...incomingFlows);
    const minIncoming = Math.min(...incomingFlows);
    const maxIncomingDept = departements[incomingFlows.indexOf(maxIncoming)];
    const minIncomingDept = departements[incomingFlows.indexOf(minIncoming)];

    return {
      maxOutgoingDept,
      maxOutgoing,
      minOutgoingDept,
      minOutgoing,
      maxIncomingDept,
      maxIncoming,
      minIncomingDept,
      minIncoming
    };
  };

  const stats = getStats();

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl font-bold mb-4">Matrice de Flux - Hôpital Saint Galmier</h2>
      
      <div className="flex mb-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => setShowLegend(!showLegend)}
        >
          {showLegend ? "Masquer la légende" : "Afficher la légende"}
        </button>
      </div>
      
      {showLegend && (
        <div className="mb-4 p-4 bg-gray-100 rounded w-full max-w-lg">
          <h3 className="font-bold mb-2">Légende :</h3>
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-green-500 mr-2 flex items-center justify-center text-white font-bold">X</div>
            <span>Accès autorisé / Flux existant</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-200 mr-2"></div>
            <span>Pas d'accès / Pas de flux</span>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto w-full">
        <div className="overflow-y-auto" style={{ maxHeight: '700px' }}>
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="p-2 border border-gray-300 bg-gray-100 sticky top-0 left-0 z-20 text-sm">De \ à</th>
                {departements.map((dept, index) => (
                  <th 
                    key={index} 
                    className={`p-1 border border-gray-300 bg-gray-100 sticky top-0 z-10 ${
                      hoveredCol === index ? 'bg-blue-100' : ''
                    }`}
                    onMouseEnter={() => setHoveredCol(index)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    <div className="text-xs transform -rotate-45 origin-bottom-left h-24 w-16 flex items-end">
                      {dept}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {departements.map((dept, rowIndex) => (
                <tr key={rowIndex} 
                    className={hoveredRow === rowIndex ? 'bg-blue-50' : ''}
                    onMouseEnter={() => setHoveredRow(rowIndex)}
                    onMouseLeave={() => setHoveredRow(null)}
                >
                  <td 
                    className="p-2 border border-gray-300 bg-gray-100 sticky left-0 z-10 font-medium"
                    style={{ minWidth: '150px' }}
                  >
                    {dept}
                  </td>
                  {flux[rowIndex].map((hasAccess, colIndex) => (
                    <td 
                      key={colIndex} 
                      className={`border border-gray-300 text-center ${
                        (hoveredRow === rowIndex || hoveredCol === colIndex) ? 'opacity-100' : 'opacity-80'
                      }`}
                      style={{ 
                        backgroundColor: hasAccess === "X" ? '#4ade80' : '#e5e7eb',
                        width: '40px',
                        height: '40px',
                      }}
                    >
                      {hasAccess === "X" && (
                        <div className="font-bold">X</div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded w-full">
        <h3 className="font-bold mb-2">Statistiques des flux :</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Département avec le plus de flux sortants :</strong> {stats.maxOutgoingDept} ({stats.maxOutgoing})</p>
            <p><strong>Département avec le moins de flux sortants :</strong> {stats.minOutgoingDept} ({stats.minOutgoing})</p>
          </div>
          <div>
            <p><strong>Département avec le plus de flux entrants :</strong> {stats.maxIncomingDept} ({stats.maxIncoming})</p>
            <p><strong>Département avec le moins de flux entrants :</strong> {stats.minIncomingDept} ({stats.minIncoming})</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded w-full">
        <h3 className="font-bold mb-2">Analyse :</h3>
        <p>Cette matrice représente les droits d'accès et les flux d'information entre les différents départements de l'Hôpital Saint Galmier. Un "X" indique qu'il existe un flux de communication ou un droit d'accès du département en ligne vers le département en colonne.</p>
        
        <p className="mt-2">Points notables :</p>
        <ul className="list-disc pl-6 mt-1">
          <li>La Qualité/Diététicienne a des relations avec presque tous les départements</li>
          <li>Le Cadre supérieur santé joue un rôle central de coordination</li>
          <li>Le Kinésithérapeute a peu d'interactions avec les autres services</li>
          <li>La Directrice et les Ressources humaines ont un niveau élevé d'accès</li>
        </ul>
      </div>
    </div>
  );
}
