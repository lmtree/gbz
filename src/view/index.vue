<template>
  <div>
    {{userdata}}
  </div>
</template>

<script>
  //
  export default{
    data(){
      return {
        userdata: {}
      }
    },
    created() {
      this.init_userdata();
    },
    methods: {
      init_userdata: function () {
        if (window.localStorage.getItem('userinfo')) {
          this.userdata = JSON.parse(window.localStorage.getItem('userinfo'));
        } else {

        }
      }
    }
  }
</script>
