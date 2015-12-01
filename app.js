var bar = new Vue({
  el: '#app',
  data: {
    val1: '0',
    val2: '0',
    val3: '0'

  },

  computed: {
    val3: function () {

      return (this.val1 + this.val2);

    }
  }

});
