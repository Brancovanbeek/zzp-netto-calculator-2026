// Dutch tax calculations for ZZP'ers (2026)

export interface CalculationInput {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  monthlyCosts: number;
  startersaftrek: boolean;
  zelfstandigenaftrek: boolean;
  mkbVrijstelling: boolean;
}

export interface CalculationResult {
  brutoOmzet: number;
  zakelijkeKosten: number;
  winstVoorAftrek: number;
  zelfstandigenaftrekBedrag: number;
  startersaftrekBedrag: number;
  mkbVrijstellingBedrag: number;
  belastbaarInkomen: number;
  inkomstenbelasting: number;
  zvwBijdrage: number;
  nettoPerJaar: number;
  nettoPerMaand: number;
  effectiefTarief: number;
}

// 2026 tax brackets (estimated based on current trends)
const TAX_BRACKETS_2026 = [
  { limit: 38441, rate: 0.3697 }, // Box 1 schijf 1
  { limit: Infinity, rate: 0.495 }, // Box 1 schijf 2
];

// ZVW bijdrage 2026 (estimated)
const ZVW_RATE = 0.0557; // 5.57%
const ZVW_MAX_INCOME = 71628; // Maximum inkomen voor ZVW

// Aftrekposten 2026
const ZELFSTANDIGENAFTREK_2026 = 1200;
const STARTERSAFTREK_2026 = 2123;
const MKB_VRIJSTELLING_RATE = 0.127; // 12.7%

// Minimum hours for zelfstandigenaftrek
const MIN_HOURS_ZELFSTANDIGENAFTREK = 1225;

export function calculateTax(input: CalculationInput): CalculationResult {
  const totalHoursPerYear = input.hoursPerWeek * input.weeksPerYear;
  
  // Bruto jaaromzet
  const brutoOmzet = input.hourlyRate * totalHoursPerYear;
  
  // Zakelijke kosten per jaar
  const zakelijkeKosten = input.monthlyCosts * 12;
  
  // Winst voor aftrek
  const winstVoorAftrek = Math.max(0, brutoOmzet - zakelijkeKosten);
  
  // Zelfstandigenaftrek (only if >= 1225 hours)
  const zelfstandigenaftrekBedrag = 
    input.zelfstandigenaftrek && totalHoursPerYear >= MIN_HOURS_ZELFSTANDIGENAFTREK
      ? Math.min(ZELFSTANDIGENAFTREK_2026, winstVoorAftrek)
      : 0;
  
  // Startersaftrek (additional deduction for starters)
  const startersaftrekBedrag = 
    input.startersaftrek && zelfstandigenaftrekBedrag > 0
      ? Math.min(STARTERSAFTREK_2026, winstVoorAftrek - zelfstandigenaftrekBedrag)
      : 0;
  
  // Winst na ondernemersaftrek
  const winstNaAftrek = winstVoorAftrek - zelfstandigenaftrekBedrag - startersaftrekBedrag;
  
  // MKB-winstvrijstelling (12.7% of profit after deductions)
  const mkbVrijstellingBedrag = input.mkbVrijstelling
    ? winstNaAftrek * MKB_VRIJSTELLING_RATE
    : 0;
  
  // Belastbaar inkomen
  const belastbaarInkomen = Math.max(0, winstNaAftrek - mkbVrijstellingBedrag);
  
  // Calculate income tax using brackets
  let inkomstenbelasting = 0;
  let remainingIncome = belastbaarInkomen;
  let previousLimit = 0;
  
  for (const bracket of TAX_BRACKETS_2026) {
    const taxableInBracket = Math.min(
      Math.max(0, remainingIncome),
      bracket.limit - previousLimit
    );
    inkomstenbelasting += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
    previousLimit = bracket.limit;
    
    if (remainingIncome <= 0) break;
  }
  
  // ZVW bijdrage (inkomensafhankelijke bijdrage)
  const zvwBijdrage = Math.min(belastbaarInkomen, ZVW_MAX_INCOME) * ZVW_RATE;
  
  // Netto per jaar
  const nettoPerJaar = winstVoorAftrek - inkomstenbelasting - zvwBijdrage;
  
  // Netto per maand
  const nettoPerMaand = nettoPerJaar / 12;
  
  // Effectief belastingtarief
  const effectiefTarief = winstVoorAftrek > 0
    ? ((inkomstenbelasting + zvwBijdrage) / winstVoorAftrek) * 100
    : 0;
  
  return {
    brutoOmzet,
    zakelijkeKosten,
    winstVoorAftrek,
    zelfstandigenaftrekBedrag,
    startersaftrekBedrag,
    mkbVrijstellingBedrag,
    belastbaarInkomen,
    inkomstenbelasting,
    zvwBijdrage,
    nettoPerJaar,
    nettoPerMaand,
    effectiefTarief,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(1)}%`;
}
