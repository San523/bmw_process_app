<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App'
}

document.setTitle = function(t) {
  document.title = t;
  var i = document.createElement('iframe');
  i.style.display = 'none';
  i.onload = function() {
    setTimeout(function() {
      i.remove();
    }, 9)
  }
  document.body.appendChild(i);
}

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

</style>
