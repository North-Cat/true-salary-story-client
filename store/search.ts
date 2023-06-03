import { defineStore } from 'pinia';
import { IShareSalary } from '@/interface/salaryData';

export const useSearchStore = defineStore('search', () => {
  const { searchApi } = useApi();
  interface ICompany {
    taxId: string;
    companyName: string;
    latestPostTitle: string[];
  }
  interface IType {
    taxId: string;
    companyName: string;
    postCount: number;
    address: string;
    phone: string;
    type: string;
  }
  interface ITitle {
    taxId: string;
    companyName: string;
    postId: number;
    title: string;
    phone: string;
    jobDescription: string;
    suggestion: string;
  }
  interface IPost {
    postId: string;
    title: string;
    companyName: string;
    feeling: string;
    overtime: string;
  }
  interface ITopCompany {
    taxId: string;
    companyName: string;
    postCount: number;
  }

  /**
   * 搜尋結果
   */
  const companies = ref<ICompany[]>();
  const companiesCount = ref();
  const titles = ref<ITitle[]>();
  const titlesCount = ref();
  const types = ref<IType[]>();
  const typesCount = ref();

  /**
   * 單一公司所有薪水
   */
  const companyName = ref(); // 公司名稱
  const companyFeeling = ref(); // 公司概況 : 上班心情
  const companyOvertime = ref(); // 公司概況 : 加班頻率
  const companyAvgMonthlySalary = ref(); // 公司概況 : 平均月薪
  const companyTotalPostCount = ref(); // 公司概況 : 薪水情報
  const companyTitles = ref(); // 公司所有職位
  const companyPost = ref<IShareSalary[]>(); // 查詢出來的單一公司薪資資訊
  const companyPostCount = ref(); // 查詢出來的單一公司薪資資訊數量

  /**
   * 熱門資訊
   */
  const latestPosts = ref<IPost[]>([]); // 最新薪水
  const popularPosts = ref<IPost[]>([]); // 熱門薪水
  const popularCompanies = ref<ITopCompany[]>([]); // 熱門公司
  const popularCompanyType = ref<string[]>([]); // 熱門產業

  /**
   * 首頁初始化資訊
   */
  const userCount = ref<number>(0); // 使用者總數量
  const postCount = ref<number>(0); // 分享薪水總數量

  /**
   * function
   */
  // call api 301 取得首頁初始資訊
  const fetchHomeInit = async () => {
    const { registeredUsers, publishedPosts } = await searchApi.getHomeInit();
    userCount.value = registeredUsers;
    postCount.value = publishedPosts;
  };

  // call api 302 取得熱門薪資資訊
  const fetchTopPost = async () => {
    const { latestPost, popularPost } = await searchApi.getTopPost();
    latestPosts.value = latestPost;
    popularPosts.value = popularPost;
  };

  // call api 303 取得熱門公司資訊
  const fetchTopCompany = async () => {
    const { companies } = await searchApi.getTopCompany();
    // 不足 5 的倍數，重複前面的資訊補足數量 (畫面顯示所需)
    const lackCount = 5 - (companies.length % 5);
    if (lackCount !== 0) {
      for (let i = 0; i < lackCount; i++) {
        companies.push(companies[i]);
      }
    }
    popularCompanies.value = companies;
  };

  // call api 305 依條件搜尋薪資資訊
  const fetchSearch = async (companyName: string, type: string, title: string, page: number, limit: number) => {
    const { companyResults, companyResultsCount, titleResults, titleResultsCount, typeResults, typeResultsCount } =
      await searchApi.getPostResultsByParam(companyName, type, title, page, limit);
    companies.value = companyResults;
    companiesCount.value = companyResultsCount;
    titles.value = titleResults;
    titlesCount.value = titleResultsCount;
    types.value = typeResults;
    typesCount.value = typeResultsCount;
  };

  // call api 306 查詢單一公司所有職位
  const fetchCompanyTitles = async (taxId: string) => {
    const { result } = await searchApi.getCompanyTitles(taxId);
    companyTitles.value = result;
  };

  // call api 307 依統編搜尋公司所有薪資資訊
  const fetchSearchCompanySalary = async (
    taxId: string,
    sortOption: string,
    titleOption: string[],
    page: number,
    limit: number,
  ) => {
    const { result } = await searchApi.getCompanySalaries(taxId, sortOption, titleOption, page, limit);
    companyPostCount.value = 10;
    companyPost.value = result.map((el: IShareSalary) => {
      return {
        postId: el?.postId || '',
        companyType: el?.companyType || '',
        taxId: el?.taxId || '',
        companyName: el?.companyName || '',
        title: el?.title || '',
        employmentType: el?.employmentType || '',
        inService: el?.inService || false,
        city: el?.city || '',
        workYears: el?.workYears || '',
        totalWorkYears: el?.totalWorkYears || '',
        monthlySalary: el?.monthlySalary ?? '',
        dailySalary: el?.dailySalary ?? '',
        avgWorkingDaysPerMonth: el?.avgWorkingDaysPerMonth ?? '',
        hourlySalary: el?.hourlySalary ?? '',
        avgHoursPerDay: el?.avgHoursPerDay ?? '',
        yearEndBonus: el?.yearEndBonus ?? '',
        holidayBonus: el?.holidayBonus ?? '',
        profitSharingBonus: el?.profitSharingBonus ?? '',
        otherBonus: el?.otherBonus ?? '',
        yearlySalary: el?.yearlySalary ?? '',
        overtime: el?.overtime || '',
        feeling: el?.feeling || '',
        jobDescription: el?.jobDescription || '',
        suggestion: el?.suggestion || '',
        tags: el?.tags || [],
        customTags: el?.customTags || [],
        createDate: el?.createDate || '',
      };
    });
  };

  // call api 308 查詢熱門產業
  const fetchTopCompanyType = async () => {
    const { companyTypes } = await searchApi.getTopCompanyType();

    // 不足 20 個，重複前面的資訊補足數量 (畫面顯示所需)
    const lackCount = 20 - companyTypes.length;
    if (lackCount !== 0) {
      for (let i = 0; i < lackCount; i++) {
        companyTypes.push(companyTypes[i]);
      }
    }

    popularCompanyType.value = [];
    for (const item of companyTypes) {
      popularCompanyType.value.push(item.type);
    }
  };

  // call api 309 查詢單一公司概況
  const fetchCompanyInfo = async (taxId: string) => {
    const { result } = await searchApi.getCompanyInfo(taxId);
    companyName.value = result.companyName;
    companyFeeling.value = result.feeling;
    companyOvertime.value = result.overtime;
    companyAvgMonthlySalary.value = result.avgMonthlySalary;
    companyTotalPostCount.value = result.postCount;
  };

  return {
    companies,
    companiesCount,
    titles,
    titlesCount,
    types,
    typesCount,
    companyPost,
    companyPostCount,
    latestPosts,
    popularPosts,
    popularCompanies,
    popularCompanyType,
    postCount,
    userCount,
    companyName,
    companyFeeling,
    companyOvertime,
    companyAvgMonthlySalary,
    companyTotalPostCount,
    companyTitles,
    fetchHomeInit,
    fetchSearch,
    fetchSearchCompanySalary,
    fetchTopPost,
    fetchTopCompany,
    fetchTopCompanyType,
    fetchCompanyInfo,
    fetchCompanyTitles,
  };
});
