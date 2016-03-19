;(function($){

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
      maxInput : _self.find('.min-input'),
      minInput : _self.find('.max-input')
    };

    _self.on('click','.min-list li',function(){
      alert('x');
    });
    _self.on('click','.max-list li',function(){
      alert('x');
    });
    _self.on('keypress','.max-input',function(){
      alert('x');
    });
    _self.on('keypress','.min-input',function(){
      alert('x');
    });

    method.renderList();

  }

})(jQuery);
