import { defineStore } from 'pinia';
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

    const companies = ref<ICompany[]>();
    const companiesCount = ref();
    const titles = ref<ITitle[]>();
    const titlesCount = ref();
    const types = ref<IType[]>();
    const typesCount = ref();

    // call api 305 依條件搜尋薪資資訊
    const fetchSearch = async (companyNameReq:string, typeReq:string, titleReq:string, pageReq:number, limitReq:number) => {
        const { companyResults, companyResultsCount, titleResults, titleResultsCount, typeResults,
        typeResultsCount } = await searchApi.getPostResultsByParam(companyNameReq, typeReq, titleReq, pageReq, limitReq);
        companies.value = companyResults;
        companiesCount.value = companyResultsCount;
        titles.value = titleResults;
        titlesCount.value = titleResultsCount;
        types.value = typeResults;
        typesCount.value = typeResultsCount;
    };
    
    // call api 依統編搜尋公司所有薪資資訊
    const fetchSearchCompanySalary = async (taxId:string) => {
        // const { data } = await searchApi.xxx;
    };

    return {
    companies,
    companiesCount,
    titles,
    titlesCount,
    types,
    typesCount,
    fetchSearch,
    fetchSearchCompanySalary
    };
});
