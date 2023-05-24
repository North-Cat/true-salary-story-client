export interface IShareSalaryFormData {
  taxId: string;
  companyName: string;
  title: string;
  employmentType: string;
  inService: boolean;
  city: string;
  workYears: number;
  totalWorkYears: number;
  monthlySalary: number;
  dailySalary: number;
  avgWorkingDaysPerMonth: number;
  hourlySalary: number;
  avgHoursPerDay: number;
  yearEndBonus: number;
  holidayBonus: number;
  profitSharingBonus: number;
  yearlySalary: number;
  otherBonus: number;
  overtime: string;
  feeling: string;
  jobDescription: string;
  suggestion: string;
  tags?: number[];
  customTags?: string[];
  createDate: string;
}

export interface ISalary {
  [key: string]: {
    salary: number | string;
    total: number | string;
    tempTotal: number | string;
    avgWorkingDaysPerMonth?: number | string;
    dailyAverageWorkingHours?: number | string;
  };
}

export interface ISalaryResult {
  companyName: string;
  title: string;
  point: number;
}
