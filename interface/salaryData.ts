export interface IShareSalaryFormData {
  taxId: string;
  companyName: string;
  title: string;
  employmentType: string;
  inService: boolean;
  city: string;
  workYears: number | string;
  totalWorkYears: number | string;
  monthlySalary: number | string;
  dailySalary: number | string;
  avgWorkingDaysPerMonth: number | string;
  hourlySalary: number | string;
  dailyAverageWorkingHours: number | string;
  yearEndBonus: number | string;
  holidayBonus: number | string;
  profitSharingBonus: number | string;
  otherBonus: string;
  overtime: number;
  feeling: number;
  jobDescription: string;
  suggestion: string;
  tags?: number[];
  customTags?: string[];
}

export interface ISalary {
  [key: string]: {
    salary: number | string;
    total: number | string;
    avgWorkingDaysPerMonth?: number | string;
    dailyAverageWorkingHours?: number | string;
  };
}

export interface ISalaryResult {
  companyName: string;
  title: string;
  point: number;
}
