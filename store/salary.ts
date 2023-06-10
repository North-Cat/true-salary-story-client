import { defineStore } from 'pinia';
import { ISalary, IShareSalary } from '~/interface/salaryData';
import { useUserStore } from '@/store/user';
import { useSearchStore } from '@/store/search';
export const useSalaryStore = defineStore('salary', () => {
  const route = useRoute();
  const user = useUserStore();
  const search = useSearchStore();
  const tempSalaryFormData = ref<IShareSalary>({});
  const tempSalary = ref<ISalary>({});
  const keywords = ref([]);
  const post = ref<IShareSalary>({
    postId: '',
    companyType: '',
    taxId: '',
    companyName: '',
    title: '',
    employmentType: '',
    inService: false,
    city: '',
    workYears: '',
    totalWorkYears: '',
    monthlySalary: '',
    dailySalary: '',
    avgWorkingDaysPerMonth: '',
    hourlySalary: '',
    avgHoursPerDay: '',
    yearEndBonus: '',
    holidayBonus: '',
    profitSharingBonus: '',
    otherBonus: '',
    yearlySalary: '',
    overtime: '',
    feeling: '',
    jobDescription: '',
    suggestion: '',
    tags: [],
    customTags: [],
    createDate: '',
<<<<<<< HEAD
    isLocked: true
=======
    createUser: '',
>>>>>>> develop
  });
  const { shareSalaryApi } = useApi();

  const fetchSalaryInfo = async (id: string) => {
    const { result } = await shareSalaryApi.getSalaryInfo(id);
    post.value = {
      postId: result?.postId || '',
      companyType: result?.companyType || '',
      taxId: result?.taxId || '',
      companyName: result?.companyName || '',
      title: result?.title || '',
      employmentType: result?.employmentType || '',
      inService: result?.inService !== undefined ? result.inService : false,
      city: result?.city || '',
      workYears: result?.workYears || '',
      totalWorkYears: result?.totalWorkYears || '',
      monthlySalary: result?.monthlySalary ?? '-',
      dailySalary: result?.dailySalary ?? '-',
      avgWorkingDaysPerMonth: result?.avgWorkingDaysPerMonth ?? '-',
      hourlySalary: result?.hourlySalary ?? '-',
      avgHoursPerDay: result?.avgHoursPerDay ?? '-',
      yearEndBonus: result?.yearEndBonus ?? '-',
      holidayBonus: result?.holidayBonus ?? '-',
      profitSharingBonus: result?.profitSharingBonus ?? '-',
      otherBonus: result?.otherBonus ?? '-',
      yearlySalary: result?.yearlySalary ?? '-',
      overtime: result?.overtime || '',
      feeling: result?.feeling || '',
      jobDescription: result?.jobDescription || '',
      suggestion: result?.suggestion || '',
      tags: result?.tags || [],
      customTags: result?.customTags || [],
      createDate: result?.createDate || '',
      isLocked: result?.isLocked !== undefined ? result.isLocked : true,
      createUser: result?.createUser || '',
    };
  };

  const fetchKeywords = async () => {
    const data = await shareSalaryApi.getKeywords();
    keywords.value = data.keywords;
  };

  const fetchPermission = async (id: string) => {
    const { message, result } = await shareSalaryApi.requestSalaryInfo(id);
    if (message === 'success') {
      if (route.name === 'companies-companiesId') {
        await search.fetchSearchCompanySalary(route.params.companiesId)
      } else {
        await fetchSalaryInfo(result.postId);
      }
      user.tryToFetchProfile();
    }
  };
  return {
    tempSalaryFormData,
    tempSalary,
    post,
    keywords,
    fetchSalaryInfo,
    fetchKeywords,
    fetchPermission,
  };
});
