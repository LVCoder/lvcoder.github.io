  var shufflechk="no";
var isIE = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/))
if(isIE){
  $("#notdisplayie").html("LimelightPlayerUtil.initEmbed('limelight_player_719408')");
  $("#notdisplayie__ebenefits").html("LimelightPlayerUtil.initEmbed('limelight_player_49311')");
  $(".limelight-player-footprint").css({'height': '100vh !important'})
   $(".non_IE").css("display","none");    
  
}
else{
     $(".custom_IE").css("display","none")
}
if(isIE)
{
	$(window).scroll(function(){
		//alert("you started scrolling");
		var abc_path = window.location.protocol + "//" + window.location.host + window.location.pathname.substr(0, 27);
		var w = window.location.href;
		if(w.indexOf(abc_path) != -1)
		{
			//alert("this is ie");
			$("div.hero__content").css("opacity", "1", "!important")
			//document.getElementById("hero__content_id").style.opacity= "1";
		}
	})
}
window.onPlaylistItemClickInternal = function(e){
 
  $homepageInternalVideo = $("#homepage-internal-video");
  if($homepageInternalVideo.length > 0){
    $("#homepage-internal-video").attr("autoplay",true);
    document.getElementById("homepage-internal-video").play();
  }
}
 $(document).ready(function(){
    var pagad = window.location.href;
   var pagchk ="no";   
        if(pagad.indexOf("/jp")>0 || pagad.indexOf("broadridge.com/ca")>0 || pagad.indexOf("/intl")>0 || pagad.indexOf("/de")>0){
          pagchk="yes";
        }
   if(pagchk=="no"){
     //$(".header").removeClass("background-out");
                                  // $(".header").addClass("background-in");
      
   }
   if($('#isGatedForm').length ==0){
                     
  $(".article-utility-bar__buttons__download").show();
   }
   $(".broadridge-top-three-awards__awards").hide();
     console.log(expcookie);
    if (newexpcookie != '1') {
    if(pagchk=="no"){
        $('.notification-alert-box').show();
    }
      
    }
   if (newexpcookie != '1') {
    if(pagad.indexOf("broadridge.com/de")>0){
        $('.notification-alert-box').show();
    }
      
    }
   
   
      if((navigator.userAgent.toLowerCase().indexOf('firefox') > -1) || (navigator.userAgent.toLowerCase().indexOf('edge') > -1)){
    $(".header").addClass("ffheader");
        $(".header").removeClass("background-out");
                             $(".header").addClass("background-in");
       $(".hero").css("margin","0");
      
       $(".background-in").css("animation","unset");
       $(".background-in").css("background","#003657");
       $(".hero__background-image--desktop").css("transform","unset");
   }
   
    	$(window).scroll(function(){
        var pageaddr = window.location.href;
        
        if(pageaddr.indexOf("broadridge.com/intl")>0){
        
        if($(".broadridge-stats__stat-content--2 .animate-number").text() !="90"){
          $(".broadridge-stats__stat-content--2 .animate-number").text("90") ;  
          
        }
         if($(".broadridge-stats__stat-content--3 .animate-number").text() !="80"){
          $(".broadridge-stats__stat-content--3 .animate-number").text("80") ;  
          
        }
         }
        else  if(pageaddr.indexOf("/jp")>0){
          if($(".broadridge-stats__stat-content--1 .animate-number").text() !="18"){
          $(".broadridge-stats__stat-content--1 .animate-number").text("18") ;  
          
        }
         if($(".broadridge-stats__stat-content--3 .animate-number").text() !="225"){
          $(".broadridge-stats__stat-content--3 .animate-number").text("225") ;  
          
        }
         }
        else{
          
           if($(".broadridge-stats__stat-content--1 .animate-number").text() !="5000"){
          $(".broadridge-stats__stat-content--1 .animate-number").text("5000") ;  
          
        }
         if($(".broadridge-stats__stat-content--3 .animate-number").text() !="95"){
          $(".broadridge-stats__stat-content--3 .animate-number").text("95") ;  
          
        }
          
        }
        var pagechk="no";
        var cachk="no";
        if(pageaddr.indexOf("/jp")>0 || pageaddr.indexOf("/intl")>0 || pageaddr.indexOf("/de")>0){
         pagechk="yes"; 
        }
         if( $(window).scrollTop()==0){
          if($(".about-broadridge").length && pagechk=="no"){
         var slidenum=".slide7";
     if(shufflechk=="yes"){
       slidenum=".slide7";
     }
            if(shufflechk=="same"){
       slidenum=".slide2";
     }  
             if(shufflechk=="high"){
       slideno=".slide7";
     }
             if(pageaddr.indexOf("broadridge.com/ca")>0){
               cachk="yes";
              slidenum=".slide5";
            }
         if($(slidenum).hasClass("slick-active")){
       
      
            $(".header").removeClass("background-out");
                                   $(".header").addClass("background-in");
      
     }
            if(cachk=="no"){
              if($(".slide1").hasClass("slick-active")){
       
      
            //$(".header").removeClass("background-out");
                                 //  $(".header").addClass("background-in");
      
     } 
            }
          
          }
         }
      if((navigator.userAgent.toLowerCase().indexOf('firefox') > -1) || (navigator.userAgent.toLowerCase().indexOf('edge') > -1)){
    $(".header").removeClass("background-out");
                             $(".header").addClass("background-in");
       $(".hero").css("margin","-15px 0 0");
         $(".hero__content").css("opacity","1");
         $(".hero__background-image--desktop").css("transform","unset");
         
   } 
        
      })
      
     
   
   
   $(".form__field__input--textarea").val("");
    $(".insights .capability").remove();
   $(".form_description_known p").attr("data-mf-replace"," ");
    if($("#hidetalk").length == 1)
   {
     $(".talk-to-us-flyout").hide();
   }
 var addr = window.location.href;
		
  
   if(addr.indexOf("resource/be-heard-your-voice-matters") > 0){
  $(".insight-featured-article").insertAfter(".cards");
}
   //test-your-proxy-cards-heading
   if(addr.indexOf("resource/test-your-proxy-voting-knowledge")>0)
   {   
      $(".cards__heading").css("cssText","margin:0 0 48px 0 !important;");
   }
   if(addr.indexOf("one-platform-easy-execution-total-confidence")>0){
     $(".insight-featured-article").insertAfter(".cards");
   }
   if(addr.indexOf("broadridge.com/") > 0){
  $(".article-utility-bar__posted-date").css("cssText","display: none !important;");
}
  if(addr.indexOf("resource/cast-your-vote-for-the-future-of-communications")>0){
      $(".cards").insertAfter(".article-overview");  
  }
     if(addr.indexOf("/resource/broadridge-at-sifma-ops-2019")>0){
     $(".video-module").insertAfter("#card");
   }
   //blockquote space in mid-page
   
    if(addr.indexOf("article/dont-settle-choose-a-partner-you-can-trust")>0)
   {   
      $(".rich-text__quote").css("cssText","margin: 0 0 -25px 0 !important;");
   }
   
  //marketing-iq h2 changes
     
    if(addr.indexOf("resource/marketing-iq")>0)
   {   
      $(".hero__info").css("cssText","font-weight: normal !important; text-transform: none !important; border-bottom: none !important; letter-spacing: 0 !important; font-family: 'KievitWeb W03 Light',sans-serif !important; font-size:24px !important;");
   }
   
    if(addr.indexOf("intl/resource/singapore-fintech-festival-2018")>0){
           
      $(".article-rich-text").eq(0).addClass("forForm");
      $(".insight-featured-article").insertAfter("#card");     
      $(".contact-broadridge").insertAfter(".forForm");
       }
   
   if(addr.indexOf("broadridge.com/customer-communications/general/") > 0 || addr.indexOf("broadridge.com/customer-communications/healthcare/") > 0|| addr.indexOf("broadridge.com/customer-communications/consumer-finance/") > 0|| addr.indexOf("broadridge.com/customer-communications/insurance/") > 0|| addr.indexOf("broadridge.com/customer-communications/telecom/") > 0 || addr.indexOf("broadridge.com/customer-communications/utilities/") > 0 || addr.indexOf("broadridge.com/customer-communications/retail-banking/") > 0){
     $(":last-child.segment-solutions__solution__item .segment-solutions__solution__item__see-more") .html("SEE SERVICES");
   }
   
   if(addr.indexOf("/intl/campaign/ready-for-next-apac") >0){
     $('.article-rich-text .inner-wrapper').css("padding","unset");
     //$('.gated-content-form__title').addClass("formheading_rfn_intl")
     $("#isresourceLPForm").addClass("rfn-apac-contact-form")
     $(".insight-featured-article").insertBefore(".rfn-apac-contact-form");
   }
     if(addr.indexOf("/jp/")==-1){
     $(".gated-content-form").addClass("headerAlign");
   }
    if(addr.indexOf("/intl/campaign/ready-for-next-emea") >0){
    $(".insight-featured-article").insertBefore("#isresourceLPForm"); 
            }
   if(addr.indexOf("/jp/campaign/ready-for-next") > 0){
     document.getElementById("contactMe").value="Lead Generation";
     $(".insight-featured-article").insertBefore("#isresourceLPForm"); 
     $(".form__field__input--checkbox").hide();
     $(".form__supplemental-fields").hide();
   }
   if(addr.indexOf("/jp/white-paper/japan-nextgentech") > 0){
     $(".gated-content-form__title").css("max-width","775px"); 
   }
   if(addr.indexOf("/financial-services/corporate-issuer/non-listed-issuer/enhanced-shareholder-engagement-for-alternatives/retail-engagement-strategy") > 0 || addr.indexOf("/intl/financial-services/capital-markets/") > 0 || addr.indexOf("/financial-services/corporate-issuer/law-firms/take-companies-public-with-single-source-simplicity/smartroom") > 0){
     $(".video-js .vjs-tech").css("left","-2px"); 
	 $(".vjs-poster").css("left","-3px"); 
   }
   if(addr.indexOf("/podcast/reimagining-communications") >0){
     $(".podcast-video").show();
     $(".article-rich-text").insertBefore("#isresourceLPForm"); 
     $(".article-rich-text").css("cssText","margin-top: 75px !important; padding: unset !important;");
     $("#isresourceLPForm").css("cssText","background-color: #f9f9f9;");
     $(".article-rich-text .inner-wrapper").css("cssText","padding: unset !important;");
            }
   if(addr.indexOf("jp/white-paper/japan-settlement-revolution")>0 || addr.indexOf("jp/white-paper/japan-derivatives-transformation")> 0 || addr.indexOf("jp/white-paper/japan-nextgentech")>0 ){
     $(".form__field__input--checkbox").hide();
$(".form__supplemental-fields").hide();
        }
   if(addr.indexOf("sec-to-provide-optional-internet-availability-of-shareholder-reports")>0){
     $('.gated-content-form__title').addClass("formheading_rfn_intl")
     $("#isresourceLPForm").addClass("rfn-apac-contact-form")
     $(".gated-content-form__lock").remove()
   }
   
    if(addr.indexOf("/resource/streamline-shareholder-communications-with-workiva-and-broadridge")>0){
     $(".contact-broadridge").insertBefore(".insight-featured-article");
   }
   if(addr.indexOf("/resource/mobile-app-signup")>0){       
       $(".related-products-solutions").css("cssText","display:none;"); 
     $(".article-rich-text .inner-wrapper ").css("cssText","padding-bottom: 20px;");   
	   }
   
     if(addr.indexOf("/resource/streamline-shareholder-communications-for-workiva-and-broadridge-clients")>0){
     $("#isresourceLPForm").insertBefore(".insight-featured-article");
   }
     
    if(addr.indexOf("/article/")>0 || addr.indexOf("/newsletter/")>0){  
  $(".stcomhide").hide();
     $(".stcom").insertAfter(".stcomhide");
     
   }
		if(addr.indexOf("jp/financial-services/capital-markets/transform-the-trade-life-cycle/connectivity") >0)
		{
       $(".cards").insertBefore(".video-module");
      $(".cards__content").addClass("cards_jp");  
    }
      if(addr.indexOf("/resource/accelerate-outcomes-with-next-gen-sec-disclosure-services-video")>0)
      {
        $(".related-products-solutions").insertBefore(".cards");
      }
   if (addr.indexOf("/resource/accelerate-outcomes-with-next-gen-sec-disclosure-services-lead")>0)
   {
     $("#isresourceLPForm").insertAfter(".article-overview");
     $(".related-products-solutions").insertAfter("#isresourceLPForm");
     $(".cards").insertAfter(".related-products-solutions")
   }
   
    if(addr.indexOf("asset-management-operations-case-studies") >0)  
   {
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        
    window.location.href = "https://view.ceros.com/g3-communications/bro11-002-cs-c-portfolio/p/1"
      }
   }
   if(addr.indexOf("5-stories-how-broadridge-managed-services-tackles-clients-toughest-challenges") >0)  
   {
      if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        
    window.location.href = " https://view.ceros.com/g3-communications/broadridge-5-success-stories-mobile/p/1"
      }
   }
      if(addr.indexOf("campaign/ready-for-next")>0)
   {
     $(".rich-text__video").addClass("rfnvideo");
      $(".cards").insertBefore(".article-overview");
      $(".cards").css("margin-top","2%");
     $(".article-utility-bar").hide();
   }
   if(addr.indexOf("campaign/ready-for-next-innovation")>0 || addr.indexOf("campaign/ready-for-next-network-value")>0 || addr.indexOf("/campaign/ready-for-next-data-and-analytics")>0 || addr.indexOf("campaign/ready-for-next")>0){
     $(".cards").insertAfter(".article-overview");
       if(addr.indexOf("/intl/campaign/ready-for-next-apac")==-1 && addr.indexOf("/intl/campaign/ready-for-next-emea")==-1 && addr.indexOf("/jp/campaign/ready-for-next") == -1){
     $(".insight-featured-article").insertAfter(".cards");
       $(".article-rich-text").insertAfter(".insight-featured-article");
       }
     $(".related-products-solutions__link").addClass("rfn-innovation-cross-sell");
     $('.related-products-solutions__list .related-products-solutions__link').eq(0).addClass('cross-sell-am');
     $('.related-products-solutions__list .related-products-solutions__link').eq(1).addClass('cross-sell-cm');
     $('.related-products-solutions__list .related-products-solutions__link').eq(2).addClass('cross-sell-cc');
     $('.related-products-solutions__list .related-products-solutions__link').eq(3).addClass('cross-sell-wm');
     $('.related-products-solutions__list .related-products-solutions__link').eq(4).addClass('cross-sell-corp');
    }
   
   
      if(addr.indexOf("resource/are-you-on-the-fast-track-to-digital-leadership")>0){
   $("body").addClass("quizart"); 
    $("body").css("cssText","padding:0% !important;");
  }
   
    if(addr.indexOf("/resource/wealth-insights") >0){
     $(".cards__container").removeClass("cards_hidden"); 
      $(".cards__more-link").hide();
    }
   
   if(addr.indexOf("/resource/save-with-return-mail")>0){
  
    $("p").css("cssText","color:inherit !important;font-size:inherit !important;font-family:'KievitWeb W03 Regular',sans-serif !important;");
      $(".heading-big").css("cssText","font-size:48px !important;");
  }
   
   if(addr.indexOf("/broadridge-insights") >0){
     $('input:checkbox').removeAttr('checked');
    }
    if(addr.indexOf("/search") >0){
     var valserchk  = $('#nav__search-box-page').val();  
      console.log(valserchk);
     if(valserchk.indexOf("maple")!=-1 || valserchk.indexOf("Maple")!=-1){
       $(".search_page").addClass("hideres");
       $(".search-results--no-results").addClass("showres");
     }
    }
    var pagechk="no";
        if(addr.indexOf("/jp")>0 || addr.indexOf("/intl")>0 || addr.indexOf("/de")>0){
         pagechk="yes"; 
        }
       
    if($(".about-broadridge").length && pagechk =="no")
  {
   
     
   
 
  $(".header").css("opacity","0.9");
    $(".header.ffheader.background-in").css("opacity","1.0");
    //$(".header").css("top","-10px");
   $( ".hero__carousel" ).on( "afterChange", function() {
      
     
   if( $(window).scrollTop()==0){
     
     
	   var slideno=".slide7";
     var capg="no";
     if(shufflechk=="yes"){
       slideno=".slide7";
     }
     if(shufflechk=="same"){
       slideno=".slide2";
     }
       if(shufflechk=="high"){
       slideno=".slide7";
     }
     if(addr.indexOf("broadridge.com/ca")>0){
       capg="yes";
              slideno=".slide5";
            }
     
      if($(slideno).hasClass("slick-active")){
       
      
        if($(".slide1").hasClass("slick-active")){
          if(capg=="no"){
            //$(".header").removeClass("background-out");
                                   //$(".header").addClass("background-in");
          }
        }
        if($(slideno).hasClass("slick-active")){
            $(".header").removeClass("background-out");
                                   $(".header").addClass("background-in");
      }
      
     }
     
     else{
      $(".header").addClass("background-out");
                             $(".header").removeClass("background-in"); 
     }
     
   
     }
});
  }
    var x = Math.floor((Math.random() * 6) + 1);
  
   if(addr.indexOf("/ca/") ==-1 && addr.indexOf("/jp/") ==-1 && addr.indexOf("/intl/") ==-1 && addr.indexOf("/de/") ==-1 && addr.indexOf("/jp?") ==-1 && addr.indexOf("/de?") ==-1 && addr.indexOf("/intl?") ==-1 && addr.indexOf("/ca?") ==-1 )
   {
     
   if ( x!=2 && x !=1){
     
     
      if(x!=7){
     shufflechk="yes";
     }
     if(x==2){
       shufflechk="same";
     }
     if(x==7){
       shufflechk="high";
     }
    $(".slide"+x).insertBefore(".slide2"); 
     
   }
   
   }
    var checkval= "yes";
   var checkval2= "yes";
   if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        checkval="mobile";
      }
   if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
        checkval="ios";
      }
   if( /iPad/i.test(navigator.userAgent) ) {
        checkval2="ipad";
      }
 
   
   if(checkval=="mobile" || checkval=="ios" ){
    
   $("#video-background").remove();
     if(checkval2=="ipad"){
     $(".mobile_txtarea").remove();
     }
     else{
      $(".desktop_txtarea").remove(); 
     }
   }
     if(checkval=="yes"){
     $(".mobile_txtarea").remove();
     }
   $(".flyout-close").click(function(){
     $('video').trigger('pause');
     $("#primary-flyout-close").removeClass( "navclose" );
     $("#Top-Flyout").removeClass( "navnarrow" );
        
   })
   
   
   $(".head__nav").click(function(){ 
    
   $("#primary-flyout-close").addClass( "navclose" );
     $("#Top-Flyout").addClass( "navnarrow" );
     
     
   })
    $("#test").click(function(){
      $(".flyout__back--desktop").hide(); 
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
           $(".flyout__back--mobile").hide();
        }
    })
  
   $(".talk-to-us-flyout").click(function(){ 
     
     var loc = window.location.href;
     if(loc.indexOf("partner") >0)
		{
     $("#home_talk").show();
      $(".flyout__back--desktop").show();
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
           $(".flyout__back--mobile").show();
          $(".flyout__back--desktop").hide();
        }
    
     $("#aWidget22256").hide();
   $("#aWidget30011").hide();
   $("#aWidget26184").hide();
   $("#aWidget28746").hide();
    }
     $("#Top-Flyout").removeClass( "navnarrow" );
     
     
		
		if(loc.indexOf("partner") == -1)
		{
     
   $("#aWidget22256").remove();
   $("#aWidget30011").remove();
   $("#aWidget26184").remove();
   $("#aWidget28746").remove();
    }  
   })
   
   $(".vidcta").click(function(){ 
   $('.video-container video').trigger('play');
     
   })
   
    $(".multi-select").click(function(){ 
    // alert($("#Top-Flyout").height() / 2);
   $("#Top-Flyout").animate({ scrollTop: 350});
    
   })
    $( window ).resize(function() {
      
      
      if(checkval=="yes"){
     $("#Top-Flyout").hide(); 
     $("body").removeClass("flyout-open");
       $("body").removeClass("flyout--preserve-nav");
      }
      $(".scrollmagic-pin-spacer").css("height","100%");
       $(".scrollmagic-pin-spacer").css("min-height","100%");
      $(".background-out").css("width","100%");
      $(".background-in").css("width","100%");
      
    })
    $(document).click(function(e){
      
     
   
 
 var clickval = $(e.target).attr('class');
   var clickid = $(e.target).attr('id');
   
  if(checkval=="mobile"){
   
   $("body.flyout-open").css({position:"static"});
   }
       
    
      if(clickval && clickval.indexOf("nav") ==-1 && clickval.indexOf("mobiledevice") ==-1 && clickval.indexOf("solutions") ==-1 && clickval.indexOf("segments") ==-1 &&  clickval.indexOf("show") == -1 && clickval.indexOf("hide") == -1 && clickval.indexOf("allproducts")== -1 && clickval.indexOf("full-name") == -1 && clickval.indexOf("ui-menu-item") ==-1 && clickval.indexOf("ui-corner-all") ==-1 && clickval.indexOf("error") ==-1 && clickval.indexOf("search") ==-1 && clickval.indexOf("chat") ==-1 && clickval.indexOf("stock") ==-1 && clickval.indexOf("mobile-content__industry__title") ==-1 && clickval.indexOf("form") ==-1 && clickval.indexOf("jp__lb") ==-1 && clickval.indexOf("back") ==-1 && clickval.indexOf("talk") ==-1 && clickval.indexOf("cta") ==-1)
      { $("#Top-Flyout").hide();
    $("#primary-flyout-close").removeClass( "navclose" );
       $("#Top-Flyout").removeClass( "navnarrow" );
     $("body").removeClass("flyout-open");
       $("body").removeClass("flyout--preserve-nav");
      // $(".header__search__close").hide();
      // $(".header__search__glass").show();
    }
     
     var locpat = window.location.href;
       var checkcnt=6;
		
		if( locpat && locpat.indexOf("jp") != -1)
		{
      checkcnt=4 ;
    }
       if( locpat && locpat.indexOf("intl") !=-1 )
		{
      checkcnt=3 ;
    }
     
     if(clickval && clickval.indexOf("nav__industry") !=-1)
     {
        
            if(clickid && clickid.indexOf(checkcnt) !=-1)
             {
            $(".nav-content__segment-header").addClass( "allproducts" );
              if( locpat && locpat.indexOf("jp") != -1)
               {
                 $(".allproducts").find(".nav-content__segment-header__title") .text( "全製品リスト" ); 
               }
               else{
                $(".allproducts").find(".nav-content__segment-header__title") .text( "List of All Products" );
                 
               }
            $('.nav-content__segment__solutions').addClass( "allproducts_listcontainer" )
             }
            if(clickid && clickid.indexOf(checkcnt) ==-1)
            {
              $(".nav-content__segment-header").removeClass("allproducts");
              $('.nav-content__segment__solutions').removeClass("allproducts_listcontainer")
             }
       if(!clickid)
            {
              $(".nav-content__segment-header").removeClass( "allproducts" );
              $('.nav-content__segment__solutions').removeClass( "allproducts_listcontainer" )
             }
       }
      if(clickval && clickval.indexOf("mobile-content__industry") !=-1)
     {
       
       
      
            if(clickid && clickid.indexOf(checkcnt) !=-1)
             {
               $(".solutions-panel__solutions__title").addClass( "allproductstitle" );
                if( locpat && locpat.indexOf("jp") != -1)
               {
                  $(".allproductstitle").text( "?????????" ); 
               }
               else{
                $(".allproductstitle").text( "List of All Products" );
               
               }
              $(".solutions-panel__solutions__description").addClass( "allproductsdesc" );
              $(".solutions-panel__solutions__solutions-list").addClass( "allproductsmobile__listcontainer" );
             }
             if(clickid && clickid.indexOf(checkcnt) ==-1)
            {
                  $(".solutions-panel__solutions__title").removeClass( "allproductstitle" );
                $(".solutions-panel__solutions__description").removeClass( "allproductsdesc" );
                $(".solutions-panel__solutions__solutions-list").removeClass( "allproductsmobile__listcontainer" );
             }
           if(!clickid)
            {
               $(".solutions-panel__solutions__title").removeClass( "allproductstitle" );
              $(".solutions-panel__solutions__description").removeClass( "allproductsdesc" );
                $(".solutions-panel__solutions__solutions-list").removeClass( "allproductsmobile__listcontainer" );
             }
       }
     
 
    })
   
   
  
   //alert("check")
		$($('#limelight_player_928999 div')[0]).css('width','100%');
   $("#nav-industry-1 > a").trigger('click');
    $(".custom_see_all").css("display","none");
   $($(".custom_see_all")[0]).css("display","block");
   $($($(".broadridge-all-awards__award__content__inner")[0]).find(".broadridge-all-awards__award__item")).each(function(i){
    
    if(i > 4){
      //$(".custom_see_all").removeClass("custom_Block")
      $(".custom_see_all")
    $($(".broadridge-all-awards__award__item")[i]).addClass("custom_Block");
      }
		})
   $(".custom_see_all").click(function(){
   	$($(".custom_see_all")[0]).text("VIEW FEWER AWARDS");
    $($(".custom_see_all")[0]).html("<span style='color: rgb(0, 163, 214); cursor: pointer; display: block;' class='custom_see_all '>VIEW FEWER AWARDS&nbsp;&nbsp;<span class='custom-ind-dev-arrow-after'></span></span>")
       if($(".broadridge-all-awards__award__item").hasClass("custom_Block")){
         $(".broadridge-all-awards__award__item").removeClass("custom_Block")
       }
     else{
     	$($(".custom_see_all")[0]).text("VIEW MORE AWARDS").addClass("custom-ind-dev-arrow-before");
    $($(".custom_see_all")[0]).html("<span style='color: rgb(0, 163, 214); cursor: pointer; display: block;' class='custom_see_all '>VIEW MORE AWARDS&nbsp;&nbsp;<span class='custom-ind-dev-arrow-intial'></span></span>")
         $($($(".broadridge-all-awards__award__content__inner")[0]).find(".broadridge-all-awards__award__item").each(function(i){
           $($(".custom_see_all")[0]).removeClass("custom_Block")
    if(i > 4){
    $($(".broadridge-all-awards__award__item")[i]).addClass("custom_Block");
          $(".custom_see_all").removeClass("custom_Block")
      }
		}))
           
     }
     })
})
//------------------------------------------------------------
// Stock Ticker
//------------------------------------------------------------
$(document).ready(function() {
  
  
     var stock=parseFloat($("#stock_value").text()).toFixed(2);
  var stockcn=parseFloat($("#stock_change").text()).toFixed(2);
      
			
		
      
                var szSymbol = '<a href="http://www.broadridge-ir.com/stock-information/stock-chart.aspx" style="font-size:inherit;font-weight:bold;color:#fff;" target="_blank">BR</a> (NYSE) ';
                szSymbol += stock;
                $('span.footer__stock-ticker__symbol').html(szSymbol);
                //Arrow
                var szStockArrow = '';
              
                if(parseFloat(stockcn)>=0)
                {
                  
                    szStockArrow = '/_assets/images/icons/icon-stock-up.svg';
                }
                else
                {
                  
                    if(parseFloat(stockcn)<0){
                        szStockArrow = '/_assets/images/icons/icon-stock-down.svg';
                    }
                }
          
                $('img.footer__stock-ticker__arrow').attr('src', szStockArrow);
                $('span.footer__stock-ticker__change').text(stockcn);
     
        
      
       
});
//-------- onkeyup and onkeydown function-----//
 function limitText(limitField, limitCount) {
                limitCount.value = "("+limitField.value.length +" characters entered)";
              }