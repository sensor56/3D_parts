var FormFileBttn=(function(o){var $J;var FormFileBttn=function(o){$J=jQuery;this.create(o);this.deconstruct();};FormFileBttn.prototype={constructor:FormFileBttn,setTarget:function(o,callback)
{if(o.external!==undefined){var external=$J(o.external);external.load(function(){return callback(external.contents().find(o.target));});}
else{return callback($J(o.target));}},setNewElement:function(o,form_file_element,callback)
{var element_id='__ffbttn_'+ Math.floor((Math.random()*1000000)+ 1);var new_element='<'+o.type+' id="'+element_id+'" class="'+o.style+'"></'+o.type+'>';form_file_element.replaceWith(new_element);if(o.external!==undefined){return callback($J(o.external).contents().find('#'+ element_id));}
else{return callback($J('#'+ element_id));}},create:function(o)
{var self=this;self.setTarget(o,function(form_file_element){form_file_element.css({'visibility':'hidden','position':'absolute'});self.setNewElement(o,form_file_element,function(new_element){new_element.html(form_file_element).append(o.html);var prevent_bubble=0;new_element.on('click',function(){var pointer=prevent_bubble+=1;if(pointer===1){form_file_element[0].click();}
else{prevent_bubble=0;}});});});},deconstruct:function()
{var $J=null;}};return FormFileBttn;})();