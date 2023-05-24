import { defineStore } from 'pinia';
import { IShareSalaryFormData, ISalary } from '~/interface/salaryData';
export const useSalaryStore = defineStore('salary', () => {
  const tempSalaryFormData = ref<IShareSalaryFormData>({});
  const tempSalary = ref<ISalary>({});
  const keywords = ref([]);
  const post = ref({});
  // TODO
  const isLocked = ref(false);
  const { shareSalaryApi } = useApi();

  const fetchSalaryInfo = async (id: number) => {
    const { result } = await shareSalaryApi.getSalaryInfo('6468c348abb6863c8509cfee');
    post.value = result;
  };

  const fetchKeywords = async () => {
    const data = await shareSalaryApi.getKeywords();
    keywords.value = data.keywords;
  };

  const fetchPermission = async (id: number) => {
    const { message } = await shareSalaryApi.requestSalaryInfo('6468c348abb6863c8509cfee');
    if (message === '成功') {
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
