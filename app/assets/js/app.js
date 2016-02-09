var APP = (function ($) {

  /**
   * Modules
   *
   * app
   * storage
   */
  var app     = {}
  var Storage = window.LSTORE;

  /**
   * Module Properties
   *
   * config
   * url
   * $el
   * settings
   * init
   * plugins
   * events
   * forms
   * loader
   * 
   */
  app = {

    // Config
    config : {
      environment : window.location.href.match(/(localhost)/g) ? 'development' : 'production',
      // debug : window.location.href.match(/(localhost|.dev)/g) ? true : false,
      debug : true,
    },

    url : window.location.href.match(/(localhost|.dev)/g) ? (window.location.origin + '/') : 'http://elzii.github.io/hots-tier-list/',


    // Elements
    $el : {
      body : $('body'),

      loader: $('#loader'),

      nav : {
        main : $('#nav--main'),
      },

      views : {
        index : $('#view--index'),
      },

    },


    dir : {
      js : rootLocation() + 'assets/js/',
      css : rootLocation() + 'assets/css/',
      images : rootLocation() + 'assets/images/',
    },


    console : {
      color : {
        'error'     : '#da1a1a',
        'event'     : '#3d8627',
        'function'  : '#3db330',
        'callback'  : '#6c6c6c',
        'object'    : '#ac07db',
        'animation' : '#c3028f',
        'control'   : '#d2a946',
        'plugin'    : '#e734d0',
        'waypoint'  : '#4e77c1',
        'hash'      : '#ad74ed',
        'number'    : '#1c1c1c',
      }
    },

  };



  /**
   * Init
   */
  app.init = function () {

    // plugin init & general event bindings
    this.plugins()
    this.events()
    this.forms.init()
    
  }



  /**
   * Plugins
   */
  app.plugins = function() {

    // Dragula
    if ( window.dragula && window.dragula !== undefined ) {
      
    }

    // Sticky
    if ( $.fn.sticky ) {

    }

    // Fast Live Filter
    if ( $.fn.fastLiveFilter) {
      

    }

  }


  /**
   * Event Listeners
   */
  app.events = function() {

    // Dropdown toggle
    $(document).on('click', '.selector', function (event) {

      event.preventDefault()


    })

   

  }





  /**
   * Forms
   */
  app.forms = {

    init: function() {

    },

  }



  /**
   * Loader
   */
  app.loader = {

    show : function() {

      app.$el.loader.show()

    },

    hide : function() {

      app.$el.loader.hide()

    }

  }





  /**
   * Hash Parser
   */
  app.hasher = {

    /**
     * Read
     * @return {Object} params
     */
    read: function() {

      var _this  = app.hasher,
          params = {};

      var e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&;=]+)=?([^&;]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
          q = window.location.hash.substring(1);

      while (e = r.exec(q))
         params[d(e[1])] = d(e[2]);

      if ( !$.isEmptyObject(params) )  {
        console.log('%cHASH', 'color:'+app.console.color.hash, params )
        _this.parse(params)
        return params;
      } else {
        return false;
      }
    },

    /**
     * Parse
     * 
     * @param  {Object} hash 
     */
    parse: function(hash) {

      // Modals
      if ( hash.hasOwnProperty('modal') ) {
        app.modals.modalShow( '#'+hash.modal )
      }

      // Admin Settings
      if ( hash.hasOwnProperty('settings') ) {
        var setting = hash.settings

        if( document.getElementById('admin-settings') ) {
          var $item = app.$el.menu.settings.find('.menu-settings__setting--'+setting);
          $item.click()
        }
      }

    }




  }






  /**
   * Curl Request
   * 
   * @param  {Object} options 
   *        
   */
  function curlRequest(options) {

    var options = options || {},
        request;

    options.url        = options.url || '';
    options.data_type  = options.data_type || 'xml';
    options.parse_json = options.parse_json || true;
    options.callback   = options.callback || undefined;

    request = $.ajax({
      url: 'ajax.php',
      type: 'POST',
      data : {
        action : 'curl',
        url : url,
        convertXML : true
      }
    })
    .done(function (data) {
      
      if ( options.parse_json ) {
        var json  = $.parseJSON(data),
            items = json.channel.item

        callback(items)
      } else {
        callback(data)
      }

    })
    .fail(function (data) {
      console.log("error", data);

      callback(data)
    })
  }  


  /**
   * searchStringInArray
   */
  function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
  }


  /**
   * substringBetween
   */
  function substringBetween( string, start, end ) {
    return string.substring( show.link.lastIndexOf(start)+1, show.link.lastIndexOf(end) );
  }

  /**
   * replaceAllInString
   */
  function replaceAllInString(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  function rootLocation() {

    var href = window.location.href,
        hash = window.location.hash;

    if ( hash.length > 0 ) {
      return href.replace(hash, '')
    } else {
      return href.replace('#', '')
    }
  }

  function rootLocationRemoveQuery() {

    var href = window.location.href,
        href = href.substring(0, href.indexOf('?'))

    return href;

  }


  /**
   * Size Prototype
   * 
   * @param  {Object} obj 
   * @return {Integer}     
   */
  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  /**
   * __
   * Helper method for selecting DOM element by ID
   * 
   * @param  {String} id 
   * @return {HTMLElement} 
   */
  function __(id) {
    return document.getElementById(id)
  }


  /**
   * Syntax Highlight
   * 
   * @param  {String|Object} json 
   * @return {String} 
   */
  function syntaxHighlight(json) {

    if (typeof json != 'string') {
     json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
 }

  /**
   * Query String
   * Get the query string form the URL
   *
   * @returns {Object} params
   */
  function QueryString() {
    var params = {};

    if (location.search) {
        var parts = location.search.substring(1).split('&');

        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }

    return params;
  }






  /**
   * EVENT: Document Ready
   * @jquery - $(document).ready(function(){  })
   *
   */
  document.addEventListener('DOMContentLoaded', function (event) {


    setTimeout(function() {
      app.$el.loader.hide()
    }, 300)
    
  })

  /**
   * EVENT: Window Load
   * @jquery - $(window).load(function(){  })
   */
  window.addEventListener('load', function (event) {
  
    app.hasher.read()
    
  })


  app.init()

  return app;
})(jQuery);