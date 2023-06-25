import { ref } from 'vue';
import { defineStore } from 'pinia';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { ILoginUserInfo, IEmail } from '@/interface/user';
import { IMySalaryResponse } from '@/interface/salaryData';
import { ISubscribeCompaniesResponse } from '@/interface/subscribe';
import { IPointsListRespose, IMyOrdersListResponse } from '@/interface/order';
import { showSuccess } from '@/utilities/message';
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

  const clearInfo = () => {
    const tokenCookie = useCookie('token');
    tokenCookie.value = null;
    currentUser.value = {} as ILoginUserInfo;
    currentPoint.value = 0;
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

  const toggleBiometric = async (enable: boolean) => {
    // Step 1: call api to toggle biometric
    const { data } = await userApi.postToggleBiometric(enable);

    if (data.biometricEnable) {
      // Step 2: register biometric
      registerBiometric();
    }

    tryToFetchProfile();
  };

  // get system type from userAgent
  const clientType = () => {
    let client = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      client = 'iOS';
    } else if (/(Android)/i.test(navigator.userAgent)) {
      client = 'Android';
    } else {
      client = 'PC';
    }
    return client;
  };

  const registerBiometric = async () => {
    const isAndroid = clientType() === 'Android';
    try {
      // Request attestation options from the server
      const attestationOptionsData = await userApi.postGenerateAttestation(isAndroid);
      const attestationOptions = attestationOptionsData.options;

      // Begin the attestation with the provided options
      const credential = await startRegistration(attestationOptions);

      // Send the attestation response back to the server to be verified
      const verifyResponse = await userApi.postVerifyAttestation(
        credential,
        attestationOptionsData.challenge,
        attestationOptionsData.userId,
      );

      if (verifyResponse.status === 'success') {
        showSuccess('', '生物註冊成功');
      }
    } catch (error) {
      await toggleBiometric(false);
    }
  };

  const postRefreshToken = async () => {
    const result = await userApi.postRefreshToken();
    if (result.status === 'success') {
      const tokenCookie = useCookie('token', { maxAge: 60 * 60 });
      tokenCookie.value = result.data.token;
      return true;
    }
    return false;
  };

  const loginBiometric = async () => {
    try {
      const assertionOptionsResponse = await userApi.postGenerateAssertion();
      const assertionOptions = assertionOptionsResponse.data;
      console.log(1, assertionOptions);
      const credential = await startAuthentication(assertionOptions);
      console.log(2, credential);
      const verifyResponse = await userApi.postVerifyAssertion(credential);
      console.log(3, verifyResponse);
    } catch (error) {
      console.log('An error occurred during the login process:', error);
    }
  };

  const enableBiometricLogin = async () => {
    const refreshSuccess = await postRefreshToken();
    if (refreshSuccess) {
      loginBiometric();
    } else {
      console.log('refresh token failed');
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
    clearInfo,
    toggleBiometric,
    enableBiometricLogin,
  };
});
