<script lang="ts" setup>
useHead({
  title: '訂單總覽',
});
definePageMeta({
  middleware: 'auth',
});
interface IOrderDetails {
  orderId: string;
  orderName: string;
  paymentMethod: string;
  createDate: string;
  price: number;
}
const limit = ref(10);
const page = ref(1);
const paginationButton = ref();
const data = {
  results: [
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/10',
      price: 699,
    },
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/08',
      price: 150,
    },
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/06',
      price: 150,
    },
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/05',
      price: 300,
    },
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/10',
      price: 699,
    },
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/08',
      price: 150,
    },
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/06',
      price: 150,
    },
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/05',
      price: 300,
    },
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/10',
      price: 699,
    },
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/08',
      price: 150,
    },
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/06',
      price: 150,
    },
    {
      orderId: 'Order1234',
      orderName: 'XXX',
      paymentMethod: 'LINEpay',
      createDate: '2023/05/05',
      price: 300,
    },
  ],
  totalCount: 12,
};
const currentResultsList = computed(() => {
  const startIndex = (page.value - 1) * limit.value;
  const endIndex = startIndex + limit.value;
  return data.results.slice(startIndex, endIndex);
});

const totalPage = computed(() => {
  return Math.ceil(data.totalCount / limit.value);
});
const onChangePage = (val: number) => {
  page.value = val;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>
<template>
  <userLayouts>
    <div class="w-full min-h-[330px]">
      <table class="table-auto w-full" aria-describedby="訂單總覽">
        <thead class="">
          <tr>
            <th>訂單編號</th>
            <th>訂單項目</th>
            <th>購買方式</th>
            <th>訂單日期</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, $index) in currentResultsList" :key="$index">
            <td>{{ item.orderId }}</td>
            <td>{{ item.orderName }}</td>
            <td>{{ item.paymentMethod }}</td>
            <td>{{ item.createDate }}</td>
            <td>{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationButton
      ref="paginationButton"
      class="flex justify-center mt-6"
      :init-page="page"
      :total-pages="totalPage"
      @change-page-event="onChangePage"
    >
    </PaginationButton>
  </userLayouts>
</template>
