import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Briefcase } from "lucide-react";

interface IncomeInputProps {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  onHourlyRateChange: (value: number) => void;
  onHoursPerWeekChange: (value: number) => void;
  onWeeksPerYearChange: (value: number) => void;
}

export const IncomeInput = ({
  hourlyRate,
  hoursPerWeek,
  weeksPerYear,
  onHourlyRateChange,
  onHoursPerWeekChange,
  onWeeksPerYearChange,
}: IncomeInputProps) => {
  return (
    <div className="card-section">
      <h2 className="section-title">
        <Briefcase className="w-5 h-5 text-primary" />
        Inkomsten
      </h2>

      <div className="space-y-6">
        {/* Uurtarief */}
        <div>
          <label className="input-label">Uurtarief</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
            <Input
              type="number"
              value={hourlyRate}
              onChange={(e) => onHourlyRateChange(Number(e.target.value))}
              className="pl-8 bg-secondary border-border text-foreground h-12"
              min={0}
              max={500}
            />
          </div>
          <Slider
            value={[hourlyRate]}
            onValueChange={(value) => onHourlyRateChange(value[0])}
            max={250}
            min={25}
            step={1}
            className="mt-3"
          />
        </div>

        {/* Uren per week */}
        <div>
          <label className="input-label">Uren per week</label>
          <div className="relative">
            <Input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => onHoursPerWeekChange(Number(e.target.value))}
              className="pr-12 bg-secondary border-border text-foreground h-12"
              min={1}
              max={60}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">uur</span>
          </div>
          <Slider
            value={[hoursPerWeek]}
            onValueChange={(value) => onHoursPerWeekChange(value[0])}
            max={60}
            min={8}
            step={1}
            className="mt-3"
          />
        </div>

        {/* Werkweken per jaar */}
        <div>
          <label className="input-label">Werkweken per jaar</label>
          <div className="relative">
            <Input
              type="number"
              value={weeksPerYear}
              onChange={(e) => onWeeksPerYearChange(Number(e.target.value))}
              className="pr-16 bg-secondary border-border text-foreground h-12"
              min={1}
              max={52}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">weken</span>
          </div>
          <Slider
            value={[weeksPerYear]}
            onValueChange={(value) => onWeeksPerYearChange(value[0])}
            max={52}
            min={20}
            step={1}
            className="mt-3"
          />
        </div>
      </div>
    </div>
  );
};
