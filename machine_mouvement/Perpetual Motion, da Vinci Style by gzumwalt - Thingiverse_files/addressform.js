var AddressForm=function(countries,country_select_name,state_select_name,iso){"use strict";var $=jQuery;if(iso==undefined||iso==null||iso==''||typeof iso!='boolean'){var iso=false;}
var SFAddressHandler=function(country_id,state_id){var self=this;var x,i=0;var country;this.country_sel=document.getElementById(country_id);this.state_sel=document.getElementById(state_id);var initial_country=this.country_sel.dataset.selected;for(country in countries){if(countries.hasOwnProperty(country)){if(iso||initial_country.length==2){this.country_sel.options[i]=new Option(country,countries[country].value);}
else{this.country_sel.options[i]=new Option(country,country);}
if(iso||initial_country.length==2){if(countries[country].value==initial_country){this.country_sel.options[i].selected=true;}}
else{if(country==initial_country){this.country_sel.options[i].selected=true;}}
i++;}}
this.country_sel.addEventListener('change',function(e){self.updateStates(this.options[this.selectedIndex].value);});};SFAddressHandler.prototype.updateStates=function(country_name){var country;var region_names;var regions;var i=0;var initial_state=this.state_sel.dataset.selected;while(this.state_sel.options.length>0){this.state_sel.remove(0);}
if(iso){for(country in countries){if(countries[country].value==country_name){regions=countries[country].regions;}}}
else{if(country_name.length>2){regions=countries[country_name].regions;}
else{for(country in countries){if(countries[country].value==country_name){regions=countries[country].regions;}}}}
if(!regions){var selected=$('#state').attr('data-selected');$('#state').after('<input type="text" id="state" name="'+state_select_name+'" maxlength="57" data-selected="'+selected+'" />');$('#state').remove();return;}
else{var selected=$('#state').attr('data-selected');$('#state').after('<select type="text" id="state" name="'+state_select_name+'" data-selected="'+selected+'"></selected>');$('#state').remove();this.state_sel=$('#state')[0];}
region_names=[];for(var prop in regions){if(regions.hasOwnProperty(prop)){region_names.push(regions[prop]);}}
region_names.sort();for(i=0;i<region_names.length;i++){this.state_sel.options[i]=new Option(region_names[i],region_names[i]);if(region_names[i]==initial_state){this.state_sel.options[i].selected=true;}}}
country_select_name=country_select_name||'00N30000003WX0t';state_select_name=state_select_name||'00N30000003WWe1';$("select[name='"+ country_select_name+"']").each(function(index){var addressForm=new SFAddressHandler(this.id,$(this).closest('form').find("select[name='"+ state_select_name+"']").attr('id'));var $countrySel=$(this);if($countrySel.data('selected')){$countrySel.val($countrySel.data('selected'));}else{$countrySel.val("United States");}
addressForm.updateStates($countrySel.data('selected'));});};