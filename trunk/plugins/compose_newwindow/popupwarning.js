var PopupWarning={init:function(){!0==this.popups_are_disabled()&&this.redirect_to_instruction_page()},redirect_to_instruction_page:function(){rcmail.display_message(rcmail.gettext("popupblockerwarning","compose_newwindow"),"warning")},popups_are_disabled:function(){if(-1<window.location.search.indexOf("_task=logout")){var a=new Date;a.setYear(a.getFullYear()+1);bw.set_cookie("popupwarning",0,a);rcmail.env.popupwarning=!1}else if(window.opener||rcmail.env.popupwarning||rcmail.env.framed||-1<document.cookie.indexOf("popupwarning=1"))return!1;
a=new Date;a.setYear(a.getFullYear()+1);bw.set_cookie("popupwarning",1,a);var b=window.open("plugins/compose_newwindow/popupwarning.html","popup_tester","width=1,height=1,left=0,top=0,status=0,toolbar=0");rcmail.env.popupwarning=b;if(!b||b.closed||"undefined"==typeof b||"undefined"==typeof b.closed)return!0;window.focus();b.blur();if(navigator&&-1<navigator.userAgent.toLowerCase().indexOf("chrome"))setTimeout(function(){PopupWarning.test_chrome_popups(b)},500);else return b.close(),!1},test_chrome_popups:function(a){if(a&&
a.chrome_popups_permitted&&!0==a.chrome_popups_permitted())return a.close(),!0;this.redirect_to_instruction_page()}};$(document).ready(function(){rcmail.addEventListener("init",function(){PopupWarning.init()})});