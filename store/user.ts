import { defineStore } from 'pinia';
import { ILoginUserInfo, IEmail } from '@/interface/user';
import { IMySalaryResponse } from '@/interface/salaryData';
import { ISubscribeCompaniesResponse } from '@/interface/subscribe';
import { IPointsListRespose, IMyOrdersListResponse } from '@/interface/order';
const { userApi, subscribeApi, orderApi } = useApi();
export const useUserStore = defineStore('user', () => {
  // 登入相關
  const isLogin = ref(false);
  const currentUser = ref<ILoginUserInfo>({});
  const token = ref('');
  const isFetchProfileLoading = ref(false);
  const currentPoint = ref(0);
  const checkTodayCheckedIn = ref(true); // 預設為已遷到，避免剛載入頁面有一瞬間可以點擊簽到
  const loginWithGoogle = () => {
    const {
      public: { apiBase },
    } = useRuntimeConfig();
    const backendUrl = `${apiBase}/social/google`;
    window.location.href = backendUrl;
  };
  const tryToFetchProfile = async () => {
    isFetchProfileLoading.value = true;
    await userApi
      .getUserProfile()
      .then(({ data: { user, hasCheckedInToday } }) => {
        currentUser.value = user as unknown as ILoginUserInfo;
        isLogin.value = true;
        currentPoint.value = user && user.points ? user.points.point : 0;
        checkTodayCheckedIn.value = hasCheckedInToday as boolean;
        isFetchProfileLoading.value = false;
      })
      .catch(() => {
        error();
      });
  };
  const logout = async () => {
    const { data } = await userApi.postLogout();
    if (data) {
      error();
    } else {
      error();
    }
  };
  const error = () => {
    const redirectToCookie = useCookie('redirectTo');
    redirectToCookie.value = null;
    const tokenCookie = useCookie('token');
    tokenCookie.value = null;
    isLogin.value = false;
    isFetchProfileLoading.value = false;
    navigateTo('/');
  };

  // 會員管理相關
  const mySalary = ref({
    result: [],
    totalCount: 0,
  } as IMySalaryResponse);
  const tryToFetchMySalary = async (data: {
    keyword: string | number | undefined;
    limit?: number | undefined;
    page: number;
  }) => {
    const result = await userApi.getMySalary(data);
    mySalary.value = {
      result: result.result || [],
      totalCount: result.totalCount || 0,
    };
  };

  const openedSalary = ref({
    result: [],
    totalCount: 0,
  } as IMySalaryResponse);
  const tryToFetchOpenedSalary = async (data: {
    keyword: string | number | undefined;
    limit?: number | undefined;
    page: number;
  }) => {
    const result = await userApi.getOpenedSalary(data);
    openedSalary.value = {
      result: result.result || [],
      totalCount: result.totalCount || 0,
    };
  };

  const subscribeCompaniesList = ref({
    result: [],
    totalCount: 0,
  } as ISubscribeCompaniesResponse);
  const tryToFetchSubscribeCompanies = async (data: {
    keyword: string | number | undefined;
    limit?: number | undefined;
    page: number;
  }) => {
    const result = await subscribeApi.getSubscribeCompanies(data);
    subscribeCompaniesList.value = {
      result: result.result || [],
      totalCount: result.totalCount || 0,
    };
  };

  const deleteSubscribeCompany = async (id: string) => {
    await subscribeApi.deleteSubscribeCompany(id);
  };

  const pointsList = ref({
    result: [],
    totalCount: 0,
  } as IPointsListRespose);
  const tryToFetchPointsList = async () => {
    const result = await orderApi.getPointList();
    pointsList.value = {
      result: result.result || [],
      totalCount: result.totalCount || 0,
    };
  };

  const myOrdersList = ref({
    result: [],
    totalCount: 0,
  } as IMyOrdersListResponse);
  const tryToFetchMyOrdersList = async () => {
    const result = await orderApi.getOrdersList();
    myOrdersList.value = {
      result: result.result || [],
      totalCount: result.totalCount || 0,
    };
  };

  const isCheckInLoading = ref(false);
  const tryToFetchPostDailyCheckIn = async () => {
    isCheckInLoading.value = true;
    await userApi.postDailyCheckIn();
    isCheckInLoading.value = false;
  };

  const isCodeSent = ref(false);
  const isEmailUpdated = ref(false);
  const fetchVerificationCode = async (email: string) => {
    const { status } = await userApi.postEmailVerificationCode(email);
    if (status === 'success') {
      isCodeSent.value = true;
    }
  };

  const updateEmail = async (params: IEmail) => {
    const { status } = await userApi.postNewEmail(params);
    if (status === 'success') {
      isEmailUpdated.value = true;
      tryToFetchProfile();
    }
  };

  return {
    tryToFetchProfile,
    isLogin,
    currentUser,
    isFetchProfileLoading,
    token,
    logout,
    loginWithGoogle,
    mySalary,
    tryToFetchMySalary,
    tryToFetchSubscribeCompanies,
    subscribeCompaniesList,
    deleteSubscribeCompany,
    myOrdersList,
    tryToFetchMyOrdersList,
    currentPoint,
    checkTodayCheckedIn,
    pointsList,
    tryToFetchPointsList,
    tryToFetchOpenedSalary,
    openedSalary,
    tryToFetchPostDailyCheckIn,
    isCheckInLoading,
    fetchVerificationCode,
    isCodeSent,
    updateEmail,
    isEmailUpdated,
  };
});
