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
        quick_menu();
    }).resize();

    //Functions
    gnb();
    all_menu();
    notify();
    tabs();
    layer_Pop();
    acco_list();
    datepicker();  
    file_upload();
    family_site();
    gnb_search();
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
    $(document).on("click", ".pc a.btn-nav-open, .tablet a.btn-nav-open", function() {
        $('#all-menu').css('right','0').fadeIn();
        $('a.btn-nav-close').css('opacity','1');
    });
    $(document).on("click", ".pc a.btn-nav-close, .tablet a.btn-nav-close", function() {
        $('#all-menu').fadeOut();
        $('a.btn-nav-close').css('opacity','0');
    });

    $(document).on("click", ".mobile a.btn-nav-open", function() {
        $("body").append($("<div id='dimmd'></div>"));
        $('#all-menu').animate({ right: "0" }, 500).show();
        $('.top-util').animate({ right: "0" }, 500).show();
        $('a.btn-nav-close').css('opacity','1').animate({ right: "305px" }, 100);

        //Sub Handling
        $(document).on('click','.mobile #all-menu > ul > li > a', function(e) {
            e.preventDefault();  
            $(this).parent().siblings().find('.depth2').stop().slideUp(500);
            $(this).parent().addClass('on');
            $(this).parent().siblings().removeClass('on');
            $(this).next().stop().slideToggle(500);   
        });
    });
    $(document).on("click", ".mobile a.btn-nav-close", function() {
        $("#dimmd").remove();
        $('#all-menu').animate({ right: "-290px" }, 500).hide();
        $('.top-util').animate({ right: "-290px" }, 500);
        $('a.btn-nav-close').animate({ right: "20px" }, 100);
    });
}

//Quick Menu
var quick_menu = function () {        
    var winW = $(window).width();
    var conW = $('.main-content, .sub-content').outerWidth()/2 + 138;

    if (winW >= 1400) {
        $('.quick-menu').css({
            'right' : '50%',
            'margin-right' : '-' + conW + 'px'
        }).removeClass('bottom');
    } else {
        $('.quick-menu').css({
            'right' : '0',
            'margin-right' : 'auto'
        }).addClass('bottom');
    }
}

var family_site = function (){
    $(document).on("click", ".family-site", function (e) {
        $(this).toggleClass('active');
        $('#footer .link-wrap').toggle();
    });
}

//notify
var notify = function () {
    $(document).on("click", ".top-util .myaccount .alarm", function (e) {
        $('#pop_notify2').fadeToggle();
        $('#pop_notify2 .list-area > div').slimscroll({
            height: 'auto',
        });
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

//File Control
var file_upload = function() {
    $(document).on('change',".frm-file input[type='file']",function(e){
        var filename = e.target.files[0].name;
        var filesize = e.target.files[0].size;
        var filetext = $(this).parent().find('.file-txt');
        var fileExt = filename.substr(filename.lastIndexOf('.')+1);
        // 확장자제한
        var inExt = ['jpg','gif','png','jpeg','hwp','xls','xlsx','doc','docx','ppt','pptx', 'pdf', 'zip'];
        if( inExt.indexOf(fileExt) < 0 ) {
            alert('허용되지않은 파일형식입니다.');
            e.target.value = '';
            return;
        }

        if ( filetext.length ) {
            $(this).siblings("input[type='text']").val(filename);    
        } else {
            // 기존 파일정보가 있을 경우 제거
            $(this).parent().find('span').remove();
            $(this).parent().append('<span class="btn-file-del"><span>' + filename + '(' + filesize + 'Byte)' + '</span><button type="button">파일 삭제</button></span>');
        }
    });    

    //File Delete
    $(document).on('click','.btn-file-del > button', function() {
        $(this).parent().remove();
    })
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
    $(document).on('click','.acco-wrap > ul > li > a', function() {
        $(this).parent().siblings().find('.cont-area').slideUp();
        $(this).parent().siblings().find('.tit-area').removeClass('active');
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    });
}   
//Datepicker
var datepicker = function() {
    var datepicker_year = new Date();
   
    $.datepicker.setDefaults({
     dateFormat: "yy-mm-dd",
     prevText: "이전 달",
     nextText: "다음 달",
     buttonImageOnly : false,
     monthNames: [
      "1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월",
     ],
     monthNamesShort: [
      "1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월",
     ],
     dayNames: ["일", "월", "화", "수", "목", "금", "토"],
     dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
     dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
     showMonthAfterYear: true,
     yearSuffix: "년",
     changeMonth: true,
     changeYear: true,
     yearRange:
      datepicker_year.getFullYear() - 90 + ":" + datepicker_year.getFullYear(),
    });
   
    $(".datepicker").datepicker();

    $('input.datepicker').on('focusin', function() {
        $('#ui-datepicker-div').attr("tabindex", "0").focus();
    });
    $('input.datepicker').on('focusout', function() {
        $('#ui-datepicker-div').removeAttr("tabindex"); 
    });
}

							


