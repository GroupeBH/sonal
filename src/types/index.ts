export interface Sport {
  id: string;
  name: string;
  icon: string;
  active: boolean;
}

export interface BettingCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

export interface Match {
  id: string;
  sport: string;
  teamA: string;
  teamB: string;
  date: string;
  odds: {
    teamA: number;
    draw?: number;
    teamB: number;
  };
}