;(function($, window, undefined){
  var $window = $(window);

  $.fn.priceRange = function(config){
    var _self = $(this);

    var defaults = {
      'minList' : [1,2,3,4,5,6],
      'maxList' : [4,5,6,7,8,9],
      'containerClass' : 'col-md-6',
      'listClass' : 'list-unstyled',
    };

    $.extend(defaults, config);

    var method = {
      renderList : function() {
        $.each(['minList','maxList'], function(k,v) {
          $.each(defaults[v], function(key,val) {
            obj[v].append('<li data-val="'+val+'">'+val+'</li>');
          });
        });
      },
      // check if active list: true/false
      isActive : function(li) {
        return li.hasClass('active');
      },
      // return container min-list: true/false
      isMinList : function(li) {
        return li.closest('ul').hasClass('min-list');
      },
      setInputVal : function(list, v) {
        obj[(list?'min':'max')+'Input'].val(v);
      },
      // disable max items
      disableMaxItems: function() {
        obj.maxList.children().each(function(){
          var _this = $(this),
              con = +_this.data('val') <= +obj.minInput.val();
          _this[(con?'add':'remove')+'Class']('disabled');
        });
      }
    };
    var list = {
      click : function() {
        var _this = $(this);

        // check if active or disabled
        if(_this.hasClass('disabled')) return;

        var con = method.isMinList(_this);
        var listActive = method.isActive(_this);

        if(!listActive) {
          method.setInputVal(con, _this.data('val'));
          _this
            .addClass('active')
            .siblings().removeClass('active');
        } else {
          _this.removeClass('active');
          method.setInputVal(con, null);
        }

        if(con) method.disableMaxItems();
      },
      setActive : function(list, inputVal) {
        list.children('li')
          .removeClass('active')
            .each(function(){
              var _this = $(this);
              if( +_this.data('val') === +inputVal ) _this.addClass('active');
            });
      }
    }
    var input = {
      keyup: function() {
        var _this = $(this);
        if(input.isMinListSibling(_this)) {
          list.setActive(obj.minList, _this.val());
          method.disableMaxItems();
        }
      },
      isMinListSibling: function(input) {
        return input.siblings('ul').hasClass('min-list');
      }

    }

    _self
      .addClass('price--range')
      // add container for fields
      .append('<div class="min-container"></div>')
      // add container for the list
      .append('<div class="max-container"></div>');

    $.each(['min','max'], function(k,v) {
      // add input and list
      _self
      .find('.'+v+'-container')
          .append('<input type="number" class="'+v+'-input" />')
          .append('<ul class="'+v+'-list"></ul>');

      // add class
      _self.find('.'+v+'-container').addClass(defaults.containerClass);
      _self.find('.'+v+'-list').addClass(defaults.listClass);
    });

    // holder of objects
    var obj = {
      minList : _self.find('.min-list'),
      maxList : _self.find('.max-list'),
      minInput : _self.find('.min-input'),
      maxInput : _self.find('.max-input')
    };

    _self.on('click','.min-list li, .max-list li', list.click);
    _self.on('keyup','.max-input, .min-input',input.keyup);

    // call to render list
    method.renderList();
  }

})(jQuery,window);
