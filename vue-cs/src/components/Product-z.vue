<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    参数:{{ route_cs }} > 标题:{{ route_title }}
  </div>
</template>
<script>
export default {
  name: 'Product',
  data() {
    return {
      route_cs: '',
      route_title: '',
      msg: 'I am Product-z pages ',
    }
  },
  mounted: function() {
    console.log(this.$route);
    this.route_cs = this.$route.params.cs;
    this.route_title = this.$route.params.title;
  },
  beforeUpdate: function() {
    //beforeUpdate 组件更新前 加载的函数
    this.route_cs = this.$route.params.cs;
    this.route_title = this.$route.params.title;
  },
  updated: function() {
    //updated 组件更新后 加载的函数'
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
