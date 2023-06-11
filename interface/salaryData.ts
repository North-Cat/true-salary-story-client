export interface IShareSalary {
  postId: string;
  companyType: string;
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
  avgHoursPerDay: number | string;
  yearlySalary: number | string;
  yearEndBonus: number | string;
  holidayBonus: number | string;
  profitSharingBonus: number | string;
  otherBonus: number | string;
  overtime: number | string;
  feeling: number | string;
  jobDescription: string;
  suggestion: string;
  tags?: number[];
  customTags?: string[];
  createDate: string;
  isLocked?: boolean;
  createUser: string;
  type: string;
}

export interface ISalary {
  [key: string]: {
    salary: number | string;
    total: number | string;
    tempTotal: number | string;
    avgWorkingDaysPerMonth?: number | string;
    avgHoursPerDay?: number | string;
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
  city?: string;
  title: string;
  monthlySalary?: number;
  hourlySalary?: number;
  dailySalary?: number;
  yearlySalary?: number;
  createDate: number;
  seen?: number;
  employmentType: string;
}

export interface IMySalaryResponse {
  result: IMySalary[];
  totalCount: number;
}
