<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="news">
      <li v-for="news in Newslist">
        <router-link :to='/news/+news.id'>{{ news.title.rendered }}</router-link>
      </li>
      <div id="demo"></div>
      <span v-if="!loading">加载中...</span>
      <div v-if="noNews"><span @click="loadNewslist()">加载更多 >></span></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      page: 1,//设置默认页数
      per_page: 20, //设置每页显示的数量
      loading: false,
      msg: 'Welcome to Your Vue.js App',
      Newslist: [],
      noNews: false
    }
  },
  mounted:function(){
    this.getNewslist()
  },
  methods:{
    getNewslist:function(){
      this.loading = false,
      this.Newslist = [];
      this.$http.get('/api/wp-json/wp/v2/posts?per_page='+this.per_page+'&page='+this.page).then(function(res){
        this.Newslist = res.body;
        console.log(this.Newslist);
        this.loading = true;
        this.noNews = true
      },function(res){
        console.log('失败')
      });
    },
    loadNewslist:function(){
      this.noNews = false
      this.loading = false;
      this.page = this.page + 1;//当前页+1

      this.$http.get('/api/wp-json/wp/v2/posts?per_page='+this.per_page+'&page='+this.page).then(function(res){
        this.Newslistmore = res.body;

        console.log(this.Newslistmore);
        this.Newslistmore.forEach(function(val){//循环输出列表
            document.getElementById("demo").innerHTML += '<li data-v-656039f0><a href='+val.id+'>'+val.title.rendered+'</a></li>';
          });   
        this.noNews = true;  
        this.loading = true;
      },function(res){
        document.getElementById("demo").innerHTML += '<li data-v-656039f0>没有了..</li>';
        this.noNews = false;
        this.loading = true;
        console.log('失败')
      });

      console.log(this.page)
    }
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

.news{display: block;}
.news li{
  display: block;
  border-bottom: 1px solid #ccc;
  line-height: 30px
}
#demo{display: block;}
#demo li{
  display: block;
  border-bottom: 1px solid #ccc;
  line-height: 30px
}

</style>
