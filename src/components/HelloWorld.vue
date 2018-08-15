<template>
  <div class="hello">
    <a-list :grid="grid" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-card :title="item.title">
          123
        </a-card>
      </a-list-item>
    </a-list>
    <a-button type="primary">Button></a-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      grid: { gutter: 0, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 },
      data: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      for (let i = 0, j = 100; i < j; i++) {
        this.data.push({ title: `Title ${i}` })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
