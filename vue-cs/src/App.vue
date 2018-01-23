<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h2>Essential Links</h2>
    <ul>      
      <li><router-link to='/'>Home</router-link></li>
      <span v-if="!loading">加载中...</span>
      <li>
        <router-link to='/News'>News</router-link>
      </li>
    </ul>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data (){
    return{
      loading: false,
      menulits:[]
    }
  },
  mounted:function(){
    this.getmenulits()
  },
  methods:{
    getmenulits:function(){
      this.menulits = [];
      this.$http.get('/api/wp-json/wp/v2/categories').then(function(res){
        this.menulits = res.body;
        console.log(this.menulits);
        this.loading = true
      },function(res){
        console.log('加载失败')
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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
span {
  display: inline-block;
  margin: 0 0 0 10px;
}

span > a{
  color: red;
}
a {
  color: #42b983;
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
