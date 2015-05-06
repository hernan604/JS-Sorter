var Sorter = Sorter || (function () {
    "use strict";
    var self = this;
    self.author = "Hernan";
    self.description = 'Sort array of objects using javascript'; 
    self.data = undefined;

    self.load = function(data) {
        self.data = data;
        return self;
    }

    self.sort = function( sort_options ) {
        if ( ! sort_options ) {
          console.error('Você precisa passar a query');
          return self;
        }
        self.data.sort(_sort_multiple( sort_options ));
        return self;
    }

    var _sort = function (property) { 
        var field       = property[0];
        var order       = property[1];
        var sort_order  = 1;
        if(   order == "desc"   ) {
            sort_order  = -1;
        }
        return function (a,b) {
            var result =  (a[field] < b[field]) ? -1 
                        : (a[field] > b[field]) ?  1 
                        : 0;
            return result * sort_order;
        }
    }

    var _sort_multiple = function (sort_options) { 
        var props                 = sort_options;
        return function (obj1, obj2) {
            var i                 = 0,
           result                 = 0,
           total_props            = props.length;
            while( result === 0   &&   i < total_props) {
                result = _sort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        }
    }

})
