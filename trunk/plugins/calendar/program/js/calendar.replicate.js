function calendar_replicate(){var e,d,f=0,b=1;this.init=function(a,c){rcmail.env.cal_template=c;rcmail.addEventListener("plugin.calendar_replicate",calendar_replicate.replicate);rcmail.addEventListener("plugin.calendar_replicate_done",calendar_replicate.done);rcmail.env.replication_complete=!1;this.replicate((new Date(1E3*rcmail.env.caleot_unix)).getFullYear(),c)};this.replicate=function(a,c){c&&(rcmail.env.cal_env=c);rcmail.env.replication_year=a;e&&(2E3>(new Date).getTime()-e?b++:b=1,b=Math.max(1,
b));d&&window.clearTimeout(d);"calendar"==rcmail.env.cal_env&&("larry"==rcmail.env.skin?($("#calreloadbut").removeClass("calloadingbut"),$("#calreloadbut").addClass("calreloadbut")):$("#calreloadbut").attr("src","plugins/calendar/skins/"+rcmail.env.skin+"/images/loading.gif"),$("#calreloadbut").attr("title",rcmail.gettext("calendar.backgroundreplication")+" ["+a+"]"));d=window.setTimeout("calendar_replicate.timeout()",2E4);rcmail.env.noreplication?calendar_replicate.done("_"+Math.round((new Date).getTime()/
1E3,0),!1):("larry"==rcmail.env.skin?($("#calreloadbut").addClass("calloadingbut"),$("#calreloadbut").removeClass("calreloadbut")):$("#calreloadbut").attr("src","plugins/calendar/skins/"+rcmail.env.skin+"/images/loading.gif"),rcmail.http_post("plugin.calendar_replicate","_year="+a+"&_step="+b));e=(new Date).getTime()};this.timeout=function(){rcmail.display_message(rcmail.gettext("calendar.replicationtimeout")+" ["+rcmail.env.replication_year+"]","error");rcmail.env.calreplicate_step=1;3>f?(rcmail.display_message(rcmail.gettext("calendar.resumereplication")+
" ["+rcmail.env.replication_year+"]","notice"),this.replicate(rcmail.env.replication_year)):(rcmail.display_message(rcmail.gettext("calendar.replicationfailed")+" ["+rcmail.env.replication_year+"]","error"),this.done((new Date).getTime()/1E3,!0));f++};this.done=function(a,c){"calendar"==rcmail.env.cal_env&&("larry"==rcmail.env.skin?($("#calreloadbut").removeClass("calloadingbut"),$("#calreloadbut").addClass("calreloadbut")):$("#calreloadbut").attr("src","plugins/calendar/skins/"+rcmail.env.skin+"/images/reload.png"));
if(""!=a){a+="";window.clearTimeout(d);if("calendar"==rcmail.env.cal_env)if(c)$("#calreloadbut").attr("title",rcmail.gettext("calendar.replicationfailed")+" "+calendar_common.localeTimeString(new Date(1E3*a))),rcmail.env.replication_complete=!1;else{var b=a;"_"==b.substr(0,1)&&(b=b.substr(1));$("#calreloadbut").attr("title",rcmail.gettext("calendar.lastreplication")+" "+calendar_common.localeTimeString(new Date(1E3*b)));rcmail.env.replication_complete=new Date(1E3*a)}"_"!=a.substr(0,1)&&calendar_replicate.refetch()}};
this.refetch=function(){$("#calendaroverlay").is(":visible")?window.setTimeout("calendar_replicate.refetch()",1E3):(window.setTimeout("$('#calendaroverlay').hide()",10),$("#"+rcmail.env.cal_template).fullCalendar("refetchEvents"))}}calendar_replicate=new calendar_replicate;