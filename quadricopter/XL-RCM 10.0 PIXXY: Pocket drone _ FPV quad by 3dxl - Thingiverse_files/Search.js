Thingiverse.Search=function(options)
{this.status_container=$('#search_status');this.query_form=$('#search_query');this.query_element=$('#edit_query');this.start_date_element=$('#start_date');this.stop_date_element=$('#stop_date');this.search_mode_element=$('#search_mode');this.order='relevant';this.type='things';this.initial_query='';this.start_date=null;this.stop_date=null;for(var attribute in options)
{if(options.hasOwnProperty(attribute)&&options[attribute])
this[attribute]=options[attribute];}
this.updateBaseUrl();var self=this;if(this.search_mode_element.prop("value")=="advanced")
self.toggleEditQuery();$('#toggle_search_mode').on("click",function(){self.toggleEditQuery();});this.edit_author_element=$("#edit_author");if(this.edit_author_element.length)
Thingiverse.Search.initUserAutocomplete(this.edit_author_element);this.edit_tag_element=$("#edit_tag");if(this.edit_tag_element.length)
Thingiverse.Search.initTagAutocomplete(this.edit_tag_element);this.edit_description_element=$("#edit_description");this.edit_license_element=$("#edit_license");}
Thingiverse.Search.prototype.updateBaseUrl=function()
{this.query_form.attr('action',"/search/"+this.order+"/"+this.type);}
Thingiverse.Search.prototype.isExpanded=function()
{return(this.query_form.is(":visible"));}
Thingiverse.Search.prototype.toggleEditQuery=function()
{this.status_container.toggle();this.query_form.toggle();if(this.isExpanded())
this.query_element.focus();var mode_toggle_element=$('#toggle-search-mode');if(this.isExpanded())
{mode_toggle_element.html("Basic Search");this.search_mode_element.prop("value","advanced");}
else
{mode_toggle_element.html("Advanced Search");this.search_mode_element.prop("value","basic");}}
Thingiverse.Search.prototype.searchQueryKeyDown=function(event)
{this.query_element=$('#edit-query');if(event.which==27)
return this.toggleEditQuery();return true;}
Thingiverse.Search.prototype.updateStartDate=function(dateString)
{var dateTok=dateString.split('-');if(dateTok.length<3)
{this.start_date=null;this.start_date_element.attr('value',"");this.start_date_element.prop('disabled',true);return;}
this.start_date=new Date(dateTok[0],dateTok[1]-1,dateTok[2]);this.start_date_element.attr('value',this.start_date.getTime()/1000);this.start_date_element.prop('disabled',false);}
Thingiverse.Search.prototype.updateStopDate=function(dateString)
{var dateTok=dateString.split('-');if(dateTok.length<3)
{this.stop_date=null;this.stop_date_element.attr('value',"");this.stop_date_element.prop('disabled',true);return;}
this.stop_date=new Date(dateTok[0],dateTok[1]-1,dateTok[2]);this.stop_date_element.attr('value',this.stop_date.getTime()/1000);this.stop_date_element.prop('disabled',false);}
Thingiverse.Search.prototype.updateOrder=function(order)
{this.order=order;this.updateBaseUrl();}
Thingiverse.Search.prototype.updateType=function(type)
{this.type=type;this.updateBaseUrl();}
Thingiverse.Search.initTagAutocomplete=function(element,close_callback,open_callback)
{var element=$(element);if(!element.length)
return;element.autocomplete({delay:250,open:function(){if(typeof(open_callback)=='function')
open_callback(this.value);},close:function(){if(typeof(close_callback)=='function')
close_callback(this.value);},source:function(request,response){var query=request.term.replace(" ","_");$.ajax({url:"/search/autocomplete",dataType:"jsonp",data:{find:"tag",q:query},complete:function(data){var tags=JSON.parse(data.responseText);response($.map(tags,function(item){return{count:item.tag_count,value:item.tag}}));}});}});element.data("ui-autocomplete")._renderItem=function(ul,item){if(!item.value)
return"";return $("<li class=\"tag\">").append("<a>"+ item.value+"<span class='pull-right'>"+ item.count+"</span></a>").appendTo(ul);};element.data("autocomplete")._resizeMenu=function(){var ul=this.menu.element;ul.outerWidth(this.element.outerWidth());};}
Thingiverse.Search.initUserAutocomplete=function(element,close_callback,open_callback)
{var element=$(element);if(!element.length)
return;element.autocomplete({delay:250,open:function(){if(typeof(open_callback)=='function')
open_callback(this.value);},close:function(){if(typeof(close_callback)=='function')
close_callback(this.value);},source:function(request,response){$.ajax({url:"/search/autocomplete",dataType:"jsonp",data:{find:"user",q:request.term},complete:function(data){var tags=JSON.parse(data.responseText);response($.map(tags,function(item){return{image:item.thumb,value:item.username}}));}});}});element.data("ui-autocomplete")._renderItem=function(ul,item){if(!item.value)
return"";return $("<li class=\"user\">").append("<a><span class='name'>"+ item.value+"</span><span class='profile-img-wrapper'><img src=\""+item.image+"\"/></span></a>").appendTo(ul);};element.data("autocomplete")._resizeMenu=function(){var ul=this.menu.element;ul.outerWidth(this.element.outerWidth());};}