<template>
    <section class="container py-5">
        <div class="fs-1 mb-5">404 找不到頁面</div>
        <p class="text-gray fs-3">輸入的網址有誤，請確認網址是否有誤。</p>
        <p class="text-gray">也可點擊下方按鈕返回首頁。</p>
        <router-link :to="{
            path: '/content',
            query:{
                uuid: `${$route.query.uuid}`
            }}" class="btn btn-outline-primary px-3">
          返回首頁
        </router-link>
    </section>
<!-- { path: '/content', query: { uuid: `${process.env.VUE_APP_UUID}` } -->
</template>

<script>
export default {
  mounted () {
    console.log(this.$route)
  }
}
</script>
