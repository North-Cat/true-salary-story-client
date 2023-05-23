import { defineStore } from 'pinia';
import { IShareSalaryFormData, ISalary } from '~/interface/salaryData';
export const useSalaryStore = defineStore('salary', {
  state: () => {
    return {
      tempSalaryFormData: {} as IShareSalaryFormData,
      tempSalary: {} as ISalary,
    };
  },
});
