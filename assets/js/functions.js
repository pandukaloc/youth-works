      jQuery(window).on('scroll', function () {
        "use strict";

        if (jQuery(this).scrollTop() > 100) {
          jQuery('#scroll-to-top').fadeIn('slow');
        } else {
          jQuery('#scroll-to-top').fadeOut('slow');
        }

        if (jQuery(window).scrollTop() > 50) {
          jQuery('header').addClass('is-sticky');
        }
        else {
         jQuery('header').removeClass('is-sticky');
       }

     });
      
      jQuery('#scroll-to-top').on("click", function(){
        "use strict";

        jQuery("html,body").animate({ scrollTop: 0 }, 1500);
        return false;
      });



      jQuery(document).ready(function($) {
       "use strict";

        // Avoid `console` errors in browsers that lack a console.
        var method;
        var noop = function () {};
        var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
          method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
          console[method] = noop;
        }
      }


      if ($(window).width() < 768) {
        $('ul.sub-menu').addClass('dropdown-menu');
     }
     else {
      $('ul.sub-menu').removeClass('dropdown-menu');
     }

     new UISearch( document.getElementById( 'sb-search' ) );

      // Header Banner Dynamic Height

      //$('#el-slider').css({height: $(window).height(top:-100)});

      //$('#el-slider').css("margin-top", Math.max(0, $(window).height()-1805)+"px");

      // $("#el-slider").css("margin-top",function () {
      //     if ($(window).height() < 805) {
      //         return "0px";  
      //     } else {
      //         return ($(window).height() + 805)+"px";
      //     }
      // });


      //Stellar Parallax

      $(window).stellar({
        responsive: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        verticalOffset: 0,
        horizontalOffset: 0,
      });


      /*------------ Volunteers Slider ------------*/
      var volunteerSlider = $("#volunteers-slider");

      volunteerSlider.owlCarousel({
      	autoPlay : 5000,
      	stopOnHover : true,
      	navigation:true,
      	paginationNumbers: false,
      	navigationText: [
      	"<i class='fa fa-angle-left post-prev'></i>",
      	"<i class='fa fa-angle-right post-next'></i>"
      	],

      	itemsCustom : [
      	[0, 1],
      	[450, 2],
      	[600, 2],
      	[700, 2],
      	[800, 3],
      	[1000, 4],
      	[1200, 4],
      	],
    // Responsive 
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window
  });

      var volunteerSlider = $("#volunteers-slider-2");

      volunteerSlider.owlCarousel({
        autoPlay : 3000,
        stopOnHover : true,
        navigation:true,
        paginationNumbers: false,
        navigationText: [
        "<i class='fa fa-angle-left post-prev'></i>",
        "<i class='fa fa-angle-right post-next'></i>"
        ],

        itemsCustom : [
        [0, 1],
        [450, 2],
        [600, 2],
        [700, 2],
        [800, 3],
        [1000, 3],
        [1200, 3],
        ],
    // Responsive 
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window
  });


      /*------------ Causes Slider ------------*/
      var causesSlider = $("#causes-slider");

      causesSlider.owlCarousel({
      	// autoPlay : 3000,
      	stopOnHover : true,
      	pagination : true,
      	paginationNumbers: false,

        itemsCustom : [
        [0, 1],
        [450, 1],
        [600, 2],
        [700, 2],
        [800, 2],
        [1000, 2],
        [1200, 3],
        ],
    // Responsive 
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window
  });


      /*------------ Causes Slider ------------*/
      var logoList = $("#logo-list");

      logoList.owlCarousel({
      	autoPlay : 3000,
      	stopOnHover : true,
      	pagination : true,
      	paginationNumbers: false,

        itemsCustom : [
        [0, 1],
        [450, 1],
        [600, 2],
        [700, 3],
        [800, 4],
        [1000, 5],
        [1200, 5],
        ],
    // Responsive 
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window
  });



      /*---------- Gallery -----------*/

      var $galleryItems = $('#gallery-items'),
      colWidth = function () {
      	var w = $galleryItems.width(), 
      	columnNum = 1,
      	columnWidth = 0;
      	if (w > 960) {
      		columnNum  = 4;
      	} 
      	else if (w > 640) {
      		columnNum  = 2;
      	} 
      	else if (w > 480) {
      		columnNum  = 2;
      	}  
      	else if (w > 360) {
      		columnNum  = 1;
      	} 
      	columnWidth = Math.floor(w/columnNum);
      	$galleryItems.find('.item').each(function() {
      		var $item = $(this),
      		multiplier_w = $item.attr('class').match(/item-w(\d)/),
      		multiplier_h = $item.attr('class').match(/item-h(\d)/),
      		width = multiplier_w ? columnWidth*multiplier_w[1] : columnWidth,
      		height = multiplier_h ? columnWidth*multiplier_h[1]*.7-10 : columnWidth*.77-10;
      		$item.css({
      			width: width,
      			height: height
      		});
      	});
      	return columnWidth;
      },
      isotope = function () {
      	$galleryItems.isotope({
      		resizable: true,
      		itemSelector: '.item',
      		masonry: {
      			columnWidth: colWidth(),
      			gutterWidth: 10
      		}
      	});
      };
      isotope();
      $(window).smartresize(isotope);

      $('.itemFilter a').click(function(){
      	$('.itemFilter .current').removeClass('current');
      	$(this).addClass('current');

      	var selector = $(this).attr('data-filter');
      	$galleryItems.isotope({
      		filter: selector,
      		animationOptions: {
      			duration: 750,
      			easing: 'linear',
      			queue: false
      		}
      	});
      	return false;

      }); 


      /*----- Mobile Decices Detect -------*/

      var isMobile = {
      	Android: function() {
      		return navigator.userAgent.match(/Android/i);
      	},
      	BlackBerry: function() {
      		return navigator.userAgent.match(/BlackBerry/i);
      	},
      	iOS: function() {
      		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      	},
      	Opera: function() {
      		return navigator.userAgent.match(/Opera Mini/i);
      	},
      	Windows: function() {
      		return navigator.userAgent.match(/IEMobile/i);
      	},
      	any: function() {
      		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      	}
      };

    });



      jQuery('.tweet-slider .tweet').twittie({
        username: 'jwthemeltd',
        list: 'ie-team',
        dateFormat: '%b. %d, %Y',
        template: '<strong class="date">{{date}}</strong> - {{screen_name}} {{tweet}}',
        count: 2
      }, function () {
        setInterval(function() {
          var item = jQuery('.tweet-slider .tweet ul').find('li:first');

          item.animate( {marginLeft: '0px', 'opacity': '0'}, 500, function() {
            jQuery(this).detach().appendTo('.tweet-slider .tweet ul').removeAttr('style');
          });
        }, 3000);
      });



