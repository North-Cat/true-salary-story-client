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
  const fetchSearchCompanySalary = async (taxId: string, page: number, limit: number) => {
    // const { data } = await searchApi.xxx;
    // 假資料
    companyPostCount.value = 10;
    companyPost.value = [
      {
        postId: '1234',
        taxId: 'xxxxxx',
        companyType: '菸酒',
        companyName: 'OOO 資訊科技有限公司100',
        title: '設計師1',
        employmentType: '資訊工程',
        inService: true,
        city: '台北',
        workYears: 2,
        totalWorkYears: 3,
        yearlySalary: 1500000,
        monthlySalary: 40000,
        dailySalary: 1000,
        avgWorkingDaysPerMonth: 20,
        hourlySalary: 100,
        avgHoursPerDay: 8,
        yearEndBonus: 40000,
        holidayBonus: 1000,
        profitSharingBonus: 1000,
        otherBonus: 1000,
        overtime: '準時上下班',
        feeling: '有苦說不出',
        jobDescription:
          '對於資深設計師來說可以學習到很多管理上及處事合作上的工作方法，也練習如何在草創環境中執行製作且時程緊迫的專案中完成任務， 會是一個執得學習的場所。公司設計目前為缺少人手的草創期，或許初期壓力會很大沒有蜜月期， 但相信對於有實力的設計師而言應該不是什麼問題，不過由於商業模式為舊有模式，因此對於設計師而言這裡可能學不到很多會專注在執行製作，發揮空間較授限。',
        suggestion:
          '公司目前營運尚未上軌道，亦即目前無法給出獎金，只能給出固定月薪，但對於想接觸類似產業的人來說，是不錯的起點。',
        createDate: '2022-11-20',
        customTags: ['有提供零食', '升遷透明'],
      },
      {
        postId: '12345',
        taxId: 'xxxxxx',
        companyType: '菸酒',
        companyName: 'OOO 資訊科技有限公司10',
        title: '設計師1',
        employmentType: '資訊工程',
        inService: true,
        city: '台北',
        workYears: 1,
        totalWorkYears: 3,
        yearlySalary: 600000,
        monthlySalary: 40000,
        dailySalary: 1000,
        avgWorkingDaysPerMonth: 20,
        hourlySalary: 100,
        avgHoursPerDay: 8,
        yearEndBonus: 40000,
        holidayBonus: 1000,
        profitSharingBonus: 1000,
        otherBonus: 1000,
        overtime: '準時上下班',
        feeling: '非常開心',
        jobDescription:
          '對於資深設計師來說可以學習到很多管理上及處事合作上的工作方法，也練習如何在草創環境中執行製作且時程緊迫的專案中完成任務， 會是一個執得學習的場所。公司設計目前為缺少人手的草創期，或許初期壓力會很大沒有蜜月期， 但相信對於有實力的設計師而言應該不是什麼問題，不過由於商業模式為舊有模式，因此對於設計師而言這裡可能學不到很多會專注在執行製作，發揮空間較授限。',
        suggestion:
          '公司目前營運尚未上軌道，亦即目前無法給出獎金，只能給出固定月薪，但對於想接觸類似產業的人來說，是不錯的起點。',
        createDate: '2022-12-20',
        customTags: ['有提供零食', '升遷透明'],
      },
      {
        postId: '123456',
        taxId: 'xxxxxx',
        companyType: '菸酒',
        companyName: 'OOO 資訊科技有限公司2',
        title: '設計師2',
        employmentType: '資訊工程',
        inService: true,
        city: '台北',
        workYears: 0,
        totalWorkYears: 3,
        yearlySalary: 700000,
        monthlySalary: 40000,
        dailySalary: 1000,
        avgWorkingDaysPerMonth: 20,
        hourlySalary: 100,
        avgHoursPerDay: 8,
        yearEndBonus: 40000,
        holidayBonus: 1000,
        profitSharingBonus: 1000,
        otherBonus: 1000,
        overtime: '準時上下班',
        feeling: '非常開心',
        jobDescription:
          '對於資深設計師來說可以學習到很多管理上及處事合作上的工作方法，也練習如何在草創環境中執行製作且時程緊迫的專案中完成任務， 會是一個執得學習的場所。公司設計目前為缺少人手的草創期，或許初期壓力會很大沒有蜜月期， 但相信對於有實力的設計師而言應該不是什麼問題，不過由於商業模式為舊有模式，因此對於設計師而言這裡可能學不到很多會專注在執行製作，發揮空間較授限。',
        suggestion:
          '公司目前營運尚未上軌道，亦即目前無法給出獎金，只能給出固定月薪，但對於想接觸類似產業的人來說，是不錯的起點。',
        createDate: '2023-03-20',
        customTags: ['有提供零食', '升遷透明'],
      },
      {
        postId: '12345678',
        taxId: 'xxxxxx',
        companyType: '菸酒',
        companyName: 'OOO 資訊科技有限公司3',
        title: '設計師3',
        employmentType: '資訊工程',
        inService: true,
        city: '台北',
        workYears: 10,
        totalWorkYears: 15,
        yearlySalary: 800000,
        monthlySalary: 40000,
        dailySalary: 1000,
        avgWorkingDaysPerMonth: 20,
        hourlySalary: 100,
        avgHoursPerDay: 8,
        yearEndBonus: 40000,
        holidayBonus: 1000,
        profitSharingBonus: 1000,
        otherBonus: 1000,
        overtime: '準時上下班',
        feeling: '有苦說不出',
        jobDescription:
          '對於資深設計師來說可以學習到很多管理上及處事合作上的工作方法，也練習如何在草創環境中執行製作且時程緊迫的專案中完成任務， 會是一個執得學習的場所。公司設計目前為缺少人手的草創期，或許初期壓力會很大沒有蜜月期， 但相信對於有實力的設計師而言應該不是什麼問題，不過由於商業模式為舊有模式，因此對於設計師而言這裡可能學不到很多會專注在執行製作，發揮空間較授限。',
        suggestion:
          '公司目前營運尚未上軌道，亦即目前無法給出獎金，只能給出固定月薪，但對於想接觸類似產業的人來說，是不錯的起點。',
        createDate: '2023-04-20',
        customTags: ['有提供零食', '升遷透明'],
      },
      {
        postId: '123456789',
        taxId: 'xxxxxx',
        companyType: '菸酒',
        companyName: 'OOO 資訊科技有限公司4',
        title: '設計師4',
        employmentType: '資訊工程',
        inService: true,
        city: '台北',
        workYears: 3,
        totalWorkYears: 3,
        yearlySalary: 900000,
        monthlySalary: 40000,
        dailySalary: 1000,
        avgWorkingDaysPerMonth: 20,
        hourlySalary: 100,
        avgHoursPerDay: 8,
        yearEndBonus: 40000,
        holidayBonus: 1000,
        profitSharingBonus: 1000,
        otherBonus: 1000,
        overtime: '準時上下班',
        feeling: '平常心',
        jobDescription:
          '對於資深設計師來說可以學習到很多管理上及處事合作上的工作方法，也練習如何在草創環境中執行製作且時程緊迫的專案中完成任務， 會是一個執得學習的場所。公司設計目前為缺少人手的草創期，或許初期壓力會很大沒有蜜月期， 但相信對於有實力的設計師而言應該不是什麼問題，不過由於商業模式為舊有模式，因此對於設計師而言這裡可能學不到很多會專注在執行製作，發揮空間較授限。',
        suggestion:
          '公司目前營運尚未上軌道，亦即目前無法給出獎金，只能給出固定月薪，但對於想接觸類似產業的人來說，是不錯的起點。',
        createDate: '2020-05-20',
        customTags: ['有提供零食', '升遷透明'],
      },
    ];
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
