import { useState, useMemo } from "react";
import { IncomeInput } from "./IncomeInput";
import { CostsInput } from "./CostsInput";
import { ResultsDisplay } from "./ResultsDisplay";
import { calculateTax } from "@/lib/taxCalculations";
import { Briefcase } from "lucide-react";

export const FreelanceCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState(97);
  const [hoursPerWeek, setHoursPerWeek] = useState(35);
  const [weeksPerYear, setWeeksPerYear] = useState(47);
  const [monthlyCosts, setMonthlyCosts] = useState(1500);
  const [startersaftrek, setStartersaftrek] = useState(false);
  const [zelfstandigenaftrek, setZelfstandigenaftrek] = useState(false);
  const [mkbVrijstelling, setMkbVrijstelling] = useState(true);

  const results = useMemo(() => {
    return calculateTax({
      hourlyRate,
      hoursPerWeek,
      weeksPerYear,
      monthlyCosts,
      startersaftrek,
      zelfstandigenaftrek,
      mkbVrijstelling,
    });
  }, [hourlyRate, hoursPerWeek, weeksPerYear, monthlyCosts, startersaftrek, zelfstandigenaftrek, mkbVrijstelling]);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Briefcase className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Freelance Inkomen Calculator
            </h1>
          </div>
          <p className="text-muted-foreground">
            Bereken je netto inkomen als ZZP'er (2026)
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <IncomeInput
              hourlyRate={hourlyRate}
              hoursPerWeek={hoursPerWeek}
              weeksPerYear={weeksPerYear}
              onHourlyRateChange={setHourlyRate}
              onHoursPerWeekChange={setHoursPerWeek}
              onWeeksPerYearChange={setWeeksPerYear}
            />
            <CostsInput
              monthlyCosts={monthlyCosts}
              startersaftrek={startersaftrek}
              zelfstandigenaftrek={zelfstandigenaftrek}
              mkbVrijstelling={mkbVrijstelling}
              onMonthlyCostsChange={setMonthlyCosts}
              onStartersaftrekChange={setStartersaftrek}
              onZelfstandigenaftrekChange={setZelfstandigenaftrek}
              onMkbVrijstellingChange={setMkbVrijstelling}
            />
          </div>

          {/* Right Column - Results */}
          <div>
            <ResultsDisplay results={results} />
          </div>
        </div>

        {/* Footer disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          Let op: Deze berekening is een indicatie gebaseerd op de verwachte belastingtarieven voor 2026. 
          Raadpleeg altijd een belastingadviseur voor exacte berekeningen.
        </p>
      </div>
    </div>
  );
};
