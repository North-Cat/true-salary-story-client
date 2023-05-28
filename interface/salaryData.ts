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

export interface ISalaryDisplayInfo {
  postId: string;
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
  isLocked: boolean;
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

export interface IMySalary {
  postId: string;
  companyName: string;
  city: string;
  title: string;
  monthlySalary: number;
  hourlySalary: number;
  dailySalary: number;
  yearlySalary: number;
  createDate: number;
  seen: number;
  employmentType: string;
}

export interface IMySalaryResponse {
  result: IMySalary[];
  totalCount: number;
}
