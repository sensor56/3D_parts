Thingiverse.User=function(json){for(var attribute in json)
{if(json.hasOwnProperty(attribute))
this[attribute]=json[attribute];}
this.last_active=new Date(this.last_active);}
Thingiverse.User.template_mini=_.template($('#usermini_template').html());Thingiverse.User.prototype.getElementMini=function()
{if(typeof(this.element_mini)=='undefined'||!this.element_mini)
this.element_mini=Thingiverse.User.template_mini(this);return this.element_mini;}