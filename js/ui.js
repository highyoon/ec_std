//Document ready
$(function () {
    //Include
    $(".header-include").load("/publish/include/header.html");
    $(".footer-include").load("/publish/include/footer.html");          

    //Resize
    $(window).resize(function(){
        var winW = $(window).width();
        
        if (winW >= 992) {
            $("body").removeClass().addClass("pc");
        } else if (winW >= 768 && winW <= 992) {
            $("body").removeClass().addClass("tablet");
        } else if (winW <= 767) {
            $("body").removeClass().addClass("mobile");
        }    
    }).resize();
    //Functions
    gnb();
    all_menu();
    lnb_menu();
    tabs();
    layer_Pop();
    acco_list(); 
    family_site();
    gnb_search();

    top_scroll_func();
});

//GNB
var gnb = function() {
    var $dep1Trigger = $('#gnb > ul > li');
    $dep1Trigger.bind({
		'mouseenter focusin': function(){
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
			$('#gnb .depth2').stop().show();
            $('#header .bg-gnb').addClass('down');
            $('#header .gnb-search').removeClass('active');
            $('#header .search-box').removeClass('on');
            $('#header .bg-gnb').removeClass('search');
		},
		'mouseleave focusout': function(){
			$(this).removeClass('active');
            $('#gnb .depth2').hide();
            $('#header .bg-gnb').removeClass('down');
		}
	});
}

//GNB Search
var gnb_search = function (){
    $(document).on("click", ".gnb-search", function() {
        $(this).toggleClass('active');
        $('#header .search-box').toggleClass('on');
        $('#header .bg-gnb').toggleClass('search');
    });
}

//All Menu 
var all_menu = function () {
    $(document).on("click", ".nav-action", function() {
        if ($('.nav-action').hasClass('close')) {
            $(this).removeClass('close');
            $('#gnb').hide();
            $('.dim').hide();
        } else {
            $(this).addClass('close')
            $('#gnb').show(300);
            $('.dim').show();
        }
    });
}

// Lnb menu
var lnb_menu = function() {
    $(document).on('click','.lnb-menu > li > a', function() {
        $(this).toggleClass('on').next(".sub-depth").stop().slideToggle(400);
    });
}

// btn_top
var top_scroll_func = function() {
    $('body').scroll(function() {
        try {
            var topScrollPos = $(this).scrollTop();
            var chkkkk = ($(this).height() / 2);

            if (topScrollPos > ($(this).height() / 2)) {
                $('.btn-top').fadeIn('fast');
            } else {
                $('.btn-top').fadeOut('fast');
            }
        } catch(e) { }
    });
    console.log('show');
};
//Top move
var btn_top = function () {
    $(document).on('click', '.btn-top a', function(ev){
        ev.preventDefault();
		var targetHash = $(this).attr('href'),
			$targetObj = $(targetHash),
			scroll_to = $targetObj.offset().top -100

		$('html, body').stop(true,false).animate({scrollTop: scroll_to},700, 'easeInOutQuart', function(){ });
    });
}



var family_site = function (){
    $(document).on("click", ".family-site", function (e) {
        $(this).toggleClass('active');
        $('#footer .link-wrap').toggle();
    });
}

//Tabs
var tabs = function () {
   $(".tab-cont > div").hide(); 
   $(".tab-nav li:first").addClass("active").show();
   $(".tab-cont > div:first").show(); 

   $(".tab-nav li").each(function() {
       $(this).on('click', function() {
           $(".tab-nav li").removeClass("active"); 
           $(this).addClass("active"); 
           $(".tab-cont > div").hide(); 

           var activeTab = $(this).find("a").attr("href"); 
           $(activeTab).fadeIn(); 
           return false;
       });
   });
}


//Layer Popup 
var layer_Pop = function() {
    $(document).on('click','.pop-open', function() {
        var $href = $(this).attr('href');
        var $open_btn = $(this);
        layer_popup($href);

        function layer_popup(el){
            var $el = $(el);

            $('body').append($("<div id='dimmd'></div>"));
            $el.attr("tabindex", "0").fadeIn().focus();

            var $elWidth = $el.outerWidth(),
                $elHeight = $el.outerHeight(),
                docWidth = $(document).width(),
                docHeight = $(document).height();

            if ($elHeight < docHeight || $elWidth < docWidth) {
                $el.css({
                    marginTop: -$elHeight /2,
                    marginLeft: -$elWidth/2
                })
            } else {
                $el.css({top: 0, left: 0});
            }

            $el.find('.pop-close').click(function(){
                $("#dimmd").remove();
                $el.fadeOut().removeAttr("tabindex"); 
                $open_btn.focus();
                return false;
            });            
        }
    })
}

//Accodion
var acco_list = function() {       
    $(document).on('click','.faq-list dt', function() {
        $(this).parent().siblings().find('dd').slideUp();
        $(this).parent().siblings().removeClass('active');
        $(this).parent().toggleClass('active');
        $(this).next().slideToggle();
    });
}

							


