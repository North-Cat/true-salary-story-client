import { defineStore } from 'pinia';
import { IShareSalaryFormData, ISalary, ISalaryDisplayInfo } from '~/interface/salaryData';
export const useSalaryStore = defineStore('salary', () => {
  const tempSalaryFormData = ref<IShareSalaryFormData>({});
  const tempSalary = ref<ISalary>({});
  const keywords = ref([]);
  const post = ref<ISalaryDisplayInfo>({
    taxId: '',
    companyName: '',
    title: '',
    employmentType: '',
    inService: false,
    city: '',
    workYears: 0,
    totalWorkYears: 0,
    monthlySalary: 0,
    dailySalary: 0,
    avgWorkingDaysPerMonth: 0,
    hourlySalary: 0,
    avgHoursPerDay: 0,
    yearEndBonus: 0,
    holidayBonus: 0,
    profitSharingBonus: 0,
    otherBonus: 0,
    yearlySalary: 0,
    overtime: '',
    feeling: '',
    jobDescription: '',
    suggestion: '',
    tags: [],
    customTags: [],
    createDate: '',
  });
  // TODO
  const isLocked = ref(false);
  const { shareSalaryApi } = useApi();

  const fetchSalaryInfo = async (id: string) => {
    const { result } = await shareSalaryApi.getSalaryInfo(id);
    post.value = result;
  };

  const fetchKeywords = async () => {
    const data = await shareSalaryApi.getKeywords();
    keywords.value = data.keywords;
  };

  const fetchPermission = async (id: string) => {
    const { message } = await shareSalaryApi.requestSalaryInfo(id);
    if (message === 'success') {
      isLocked.value = true;
    }
  };
  return {
    tempSalaryFormData,
    tempSalary,
    post,
    keywords,
    isLocked,
    fetchSalaryInfo,
    fetchKeywords,
    fetchPermission,
  };
});
