import { CalculationResult, formatCurrency, formatPercentage } from "@/lib/taxCalculations";
import { TrendingUp } from "lucide-react";

interface ResultsDisplayProps {
  results: CalculationResult;
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  return (
    <div className="card-section h-full">
      <h2 className="section-title">
        <TrendingUp className="w-5 h-5 text-primary" />
        Resultaat
      </h2>

      <div className="space-y-1">
        {/* Bruto section */}
        <div className="result-row">
          <span className="result-label">Bruto jaaromzet</span>
          <span className="result-value-positive">€ {formatCurrency(results.brutoOmzet)}</span>
        </div>
        <div className="result-row">
          <span className="result-label">Zakelijke kosten (jaar)</span>
          <span className="result-value-negative">-€ {formatCurrency(results.zakelijkeKosten)}</span>
        </div>
        <div className="result-row border-b border-border pb-3">
          <span className="result-label">Winst voor aftrek</span>
          <span className="result-value-positive">€ {formatCurrency(results.winstVoorAftrek)}</span>
        </div>

        {/* Fiscale aftrekposten */}
        <div className="pt-3">
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
            Fiscale Aftrekposten
          </h3>
          
          <div className="result-row">
            <span className="result-label">Zelfstandigenaftrek</span>
            <span className="result-value-negative">-€ {formatCurrency(results.zelfstandigenaftrekBedrag)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Startersaftrek</span>
            <span className="result-value-negative">-€ {formatCurrency(results.startersaftrekBedrag)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">MKB-winstvrijstelling</span>
            <span className="result-value-negative">-€ {formatCurrency(results.mkbVrijstellingBedrag)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Belastbaar inkomen</span>
            <span className="result-value-positive">€ {formatCurrency(results.belastbaarInkomen)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Inkomstenbelasting</span>
            <span className="result-value-negative">-€ {formatCurrency(results.inkomstenbelasting)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Inkomensafh. bijdrage Zvw</span>
            <span className="result-value-negative">-€ {formatCurrency(results.zvwBijdrage)}</span>
          </div>
        </div>

        {/* Highlight box */}
        <div className="result-highlight">
          <p className="result-highlight-label">Netto per maand</p>
          <p className="result-highlight-value">€ {formatCurrency(results.nettoPerMaand)}</p>
          <p className="result-highlight-subtitle">Na belastingen en kosten</p>
        </div>

        {/* Bottom stats */}
        <div className="result-row">
          <span className="result-label">Netto per jaar</span>
          <span className="result-value-positive">€ {formatCurrency(results.nettoPerJaar)}</span>
        </div>
        <div className="result-row">
          <span className="result-label">Effectief belastingtarief</span>
          <span className="result-value-positive">{formatPercentage(results.effectiefTarief)}</span>
        </div>
      </div>
    </div>
  );
};
