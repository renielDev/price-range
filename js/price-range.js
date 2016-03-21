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

    var method = {
      renderList : function() {
        $.each(['minList','maxList'], function(k,v) {
          $.each(defaults[v], function(key,val) {
            obj[v].append('<li data-val="'+val+'">'+val+'</li>');
          });
        });
      },
      listClick : function() {
        var $this = $(this);
        
        if(method.isActive($this)) return;

        $this
          .addClass('active')
            .siblings().removeClass('active');

        var isMinList = method.isMinList($this);

        method.setInputVal(isMinList,$this.data('val'));

        if(isMinList)
          method.disableMaxItems();
      },
      isActive : function(li) {
        var con = method.isMinList(li);
        obj[(con?'min':'max')+'Input'].val(null);

        method.disableMaxItems();
        if(li.hasClass('active')) {
          li.removeClass('active');
          return true;
        }
        return false;
      },
      isMinList : function(li) {
        return li.closest('ul').hasClass('min-list');
      },
      setInputVal : function(list, v) {
        obj[(list?'min':'max')+'Input'].val(v);
      },
      disableMaxItems: function() {
        obj.maxList.children().each(function(){
          var $this = $(this),
              con = +$this.data('val') < +obj.minInput.val();
          $this[(con?'add':'remove')+'Class']('disabled');
        });
      }
    };

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

    _self.on('click','.min-list li, .max-list li', method.listClick);
    _self.on('keypress','.max-input',function(){
      alert('x');
    });
    _self.on('keypress','.min-input',function(){
      alert('x');
    });

    method.renderList();

  }

})(jQuery,window);
