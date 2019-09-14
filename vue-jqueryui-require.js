require.config({
  baseUrl: "/static/js/",
  urlArgs: "v=1." + new Date().getTime(),
  paths: {
    'jquery': 'https://code.jquery.com/jquery-3.4.1',
    'jquery.ui': 'https://code.jquery.com/ui/1.12.1/jquery-ui',
    'vue': 'https://cdn.jsdelivr.net/npm/vue/dist/vue',
  },
  shim: {
    'jquery.ui': {
      deps: ['jquery'],
    },
    'vue': {
      exports: 'vue'
    }
  }
});

define(['jquery', 'vue', 'jquery.ui'],
  function ($, vue) {
    header();
    CDatePicker(vue);
    const vobj = VDate(vue);
  }
);

const header = function () {
  console.log('$ 1', $);
  $('head').append(`
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="https://null.jsbin.com/resources/demos/style.css">
  <style>
    .ui-autocomplete-loading {
      background: white url("/static/img/ui-anim_basic_16x16.gif") right center no-repeat;
    }
  </style>
`);
};

const CDatePicker = function (vue) {
  vue.component('date-picker', {
    template: '<input/>',
    props: ['dateFormat'],
    mounted: function () {
      var self = this;
      $(this.$el).datepicker({
        dateFormat: this.dateFormat,
        onSelect: function (date) {
          self.$emit('update-date', date);
        }
      });
    },
    beforeDestroy: function () {
      $(this.$el).datepicker('hide').datepicker('destroy');
    }
  });
};

const VDate = function (vue) {
  return new vue({
    el: '#app',
    data: {
      date: null
    },
    methods: {
      updateDate: function (date) {
        this.date = date;
      }
    }
  });
};
