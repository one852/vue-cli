<template>          
  <div class="hello">
    <li v-for="lits in menulits">
        <a @click="par_page(lits.id)">{{ lits.name }}</a>
    </li>
    <h1>{{ msg }}</h1>

    <div id="demo"></div>
    <span v-if="!loading">加载中...</span>
    <div v-if="noNews"><span @click="loadNewslist()">加载更多 >></span></div>
  </div>
</template>
<script>
export default {
  name: 'News',
  data() {
    return {
      page: 1,//设置默认页数
      per_page: 20, //设置每页显示的数量
      msg: 'I am News pages',
      routeid: 3,
      Newslist: [],
      loading: false,
      noNews: false,
      menulits:[]
    }
  },
  mounted:function(){
    this.getNewslist();
    this.getmenulits()
  },
  methods:{

    par_page:function(val){
      this.routeid = val;
      this.getNewslist();
      console.log(this.routeid)
    },
    getNewslist:function(){
      this.noNews = false;
      this.loading = false;
      document.getElementById("demo").innerHTML = '';
      this.$http.get('/api/wp-json/wp/v2/posts?per_page='+this.per_page+'&page='+this.page+'&categories='+this.routeid).then(function(res){
        console.log(res.body);
        this.Newslist = res.body;
        if (this.Newslist.length == 0) {
             document.getElementById("demo").innerHTML = '<li data-v-1e96713a>没有文章</li>';
             this.noNews = false;
        }else{
          this.Newslist.forEach(function(val){
             document.getElementById("demo").innerHTML += '<li data-v-1e96713a><a href='+val.id+'>'+val.title.rendered+'</a></li>';
          })
          this.noNews = true;
        };
        this.loading = true;
      })
    },
    getmenulits:function(){
      this.menulits = [];
      this.$http.get('/api/wp-json/wp/v2/categories').then(function(res){
        this.menulits = res.body;
        console.log(this.menulits);
      },function(res){
        console.log('加载失败')
      });
    },
    loadNewslist:function(){
      this.page = this.page + 1;
      this.noNews = false;
      this.loading = false;
      this.$http.get('/api/wp-json/wp/v2/posts?per_page='+this.per_page+'&page='+this.page+'&categories='+this.routeid).then(function(res){
        console.log(res.body);
        this.Newslist = res.body;

        this.noNews = false;
        this.Newslist.forEach(function(val){
           document.getElementById("demo").innerHTML += '<li data-v-1e96713a><a href='+val.id+'>'+val.title.rendered+'</a></li>';
        })
        this.noNews = true;
        this.loading = true;
      },function(res){
        document.getElementById("demo").innerHTML += '<li data-v-1e96713a>没有文章</li>';
        this.loading = true;
        this.noNews = false;
      })

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


.component-fade-enter-active {
  animation: bounce-in .5s;
}
.component-fade-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
