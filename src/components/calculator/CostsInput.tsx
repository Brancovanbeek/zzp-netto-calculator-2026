import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Coins } from "lucide-react";

interface CostsInputProps {
  monthlyCosts: number;
  startersaftrek: boolean;
  zelfstandigenaftrek: boolean;
  mkbVrijstelling: boolean;
  onMonthlyCostsChange: (value: number) => void;
  onStartersaftrekChange: (value: boolean) => void;
  onZelfstandigenaftrekChange: (value: boolean) => void;
  onMkbVrijstellingChange: (value: boolean) => void;
}

export const CostsInput = ({
  monthlyCosts,
  startersaftrek,
  zelfstandigenaftrek,
  mkbVrijstelling,
  onMonthlyCostsChange,
  onStartersaftrekChange,
  onZelfstandigenaftrekChange,
  onMkbVrijstellingChange,
}: CostsInputProps) => {
  return (
    <div className="card-section">
      <h2 className="section-title">
        <Coins className="w-5 h-5 text-primary" />
        Kosten & Aftrekposten
      </h2>

      <div className="space-y-5">
        {/* Maandelijkse zakelijke kosten */}
        <div>
          <label className="input-label">Maandelijkse zakelijke kosten</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
            <Input
              type="number"
              value={monthlyCosts}
              onChange={(e) => onMonthlyCostsChange(Number(e.target.value))}
              className="pl-8 bg-secondary border-border text-foreground h-12"
              min={0}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="startersaftrek"
              checked={startersaftrek}
              onCheckedChange={(checked) => onStartersaftrekChange(checked === true)}
              className="mt-0.5"
            />
            <div>
              <label htmlFor="startersaftrek" className="text-sm font-medium text-foreground cursor-pointer">
                Startersaftrek
              </label>
              <p className="text-xs text-muted-foreground">€2.123 extra aftrek (max 3 jaar)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="zelfstandigenaftrek"
              checked={zelfstandigenaftrek}
              onCheckedChange={(checked) => onZelfstandigenaftrekChange(checked === true)}
              className="mt-0.5"
            />
            <div>
              <label htmlFor="zelfstandigenaftrek" className="text-sm font-medium text-foreground cursor-pointer">
                Zelfstandigenaftrek
              </label>
              <p className="text-xs text-muted-foreground">€1.200 aftrek (2026, min 1.225 uur)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="mkbVrijstelling"
              checked={mkbVrijstelling}
              onCheckedChange={(checked) => onMkbVrijstellingChange(checked === true)}
              className="mt-0.5"
            />
            <div>
              <label htmlFor="mkbVrijstelling" className="text-sm font-medium text-foreground cursor-pointer">
                MKB-winstvrijstelling
              </label>
              <p className="text-xs text-muted-foreground">12,7% van de winst is vrijgesteld</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
