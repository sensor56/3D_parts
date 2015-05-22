Thingiverse.Spotlight=function(){}
Thingiverse.Spotlight.save=function(form){var formArray=$(form).serializeArray();var formData={};for(var i=0;i<formArray.length;i++){if(formArray[i]==undefined)
continue;formData[formArray[i].name]=formArray[i].value;}
$.ajax({type:"POST",url:$(form).attr('action'),data:formData,complete:function(xhr){console.log(xhr.status+": "+xhr.responseText)
if(xhr.status==200)
document.location="/admin/spotlight";},dataType:'json'});}
Thingiverse.Spotlight.updatePreview=function(form){var formArray=$(form).serializeArray();var formData={};for(var i=0;i<formArray.length;i++){if(formArray[i]==undefined)
continue;formData[formArray[i].name]=formArray[i].value;}
$('#spotlight_0').parent().attr('class','spotlight '+formData['theme']+' '+formData['color'])
$('#spotlight_0').attr('title',formData['blurb']).attr('href',formData['url']);$('#spotlight_0 .background').css('background-image','url('+formData['background_url']+')');var details=$('#spotlight_0').next('.details');details.find('.text').html(formData['text']);details.find('img').attr('src','/img/'+formData['theme']+'_'+formData['color']+'.png');}
Thingiverse.Spotlight.textAddButton=function(text,url){var text=$('textarea[name="text"]');var background_color=$('select[name="color"]').prop('value');var color='black';if(background_color=='black')
color='white';var current_text=text.prop('value');text.prop('value',current_text+"\n</br></br><a href='"+url+"'><span style='background:"+background_color+";color:"+color+";padding:10px;line-height:60px;border-radius:5px;font-weight:bold'>Learn More</span></a>");Thingiverse.Spotlight.updatePreview('#spotlight_edit_form');}