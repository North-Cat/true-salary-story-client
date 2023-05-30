import { defineStore } from 'pinia';
import { IShareSalaryFormData, ISalary, ISalaryDisplayInfo } from '~/interface/salaryData';
export const useSalaryStore = defineStore('salary', () => {
  const tempSalaryFormData = ref<IShareSalaryFormData>({});
  const tempSalary = ref<ISalary>({});
  const keywords = ref([]);
  const post = ref<ISalaryDisplayInfo>({
    postId: '',
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
  const isLocked = ref(true);
  const { shareSalaryApi } = useApi();

  const fetchSalaryInfo = async (id: string) => {
    const { result } = await shareSalaryApi.getSalaryInfo(id);
    post.value = result.post;
    isLocked.value = result.isLocked;
  };

  const fetchKeywords = async () => {
    const data = await shareSalaryApi.getKeywords();
    keywords.value = data.keywords;
  };

  const fetchPermission = async (id: string) => {
    const { message, result } = await shareSalaryApi.requestSalaryInfo(id);
    if (message === 'success') {
      fetchSalaryInfo(result.postId);
    }
  };
  return {
    tempSalaryFormData,
    tempSalary,
    post,
    isLocked,
    keywords,
    fetchSalaryInfo,
    fetchKeywords,
    fetchPermission,
  };
});
