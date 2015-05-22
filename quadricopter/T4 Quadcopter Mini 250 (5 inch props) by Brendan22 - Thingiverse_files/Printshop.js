Thingiverse.Printshop=function(){}
Thingiverse.Printshop.initAdminPage=function(){$('ul.things').sortable();$('ul.things').on("sortstop",function(event,ui){$.ajax({type:"POST",url:'/ajax/thingcollection/reorder_things',data:{id:ui.item.attr('value'),prev_id:ui.item.prev().attr('value'),next_id:ui.item.next().attr('value'),},complete:function(xhr){console.log(xhr.status+": "+xhr.responseText)},dataType:'json'});});}
Thingiverse.Printshop.initEditPage=function(){$('ul.renders').sortable();$('ul.images').sortable();$('ul.images').on("sortstop",function(event,ui){$.ajax({type:"POST",url:'/ajax/things/orderimages',data:{thing_id:document.getElementById('id').getAttribute('value'),image_ids:$('ul.images').sortable("toArray",{attribute:"value"}).filter(function(value){return value;})},complete:function(xhr){console.log(xhr.status+": "+xhr.responseText)},dataType:'json'});});}
Thingiverse.Printshop.save=function(form){var formArray=$(form).serializeArray();var formData={};for(var i=0;i<formArray.length;i++){if(formArray[i]==undefined)
continue;formData[formArray[i].name]=formArray[i].value;}
if($('ul.renders'))
formData['image_id']=$('ul.renders').sortable("toArray",{attribute:"value"})[0];$.ajax({type:"POST",url:$(form).attr('action'),data:formData,complete:function(xhr){console.log(xhr.status+": "+xhr.responseText)
if(xhr.status==200)
document.location="/admin/printshop/explore";},dataType:'json'});}
Thingiverse.Printshop.createLayout=function(){var formData={};formData['id']=$('#id').val();formData['printer_id']=$('#create_layout_printer_id').val();if($('ul.renders'))
formData['object_id']=$('ul.renders').sortable("toArray",{attribute:"file_id"})[0];if(!formData['object_id'])
{alert('drag a model into the top-left box');return;}
$.ajax({type:"POST",url:"/ajax/printshopexplorethings/create_layout/",data:formData,complete:function(xhr){console.log(xhr.status+": "+xhr.responseText)
if(xhr.status==200)
document.location.reload();},dataType:'json'});}
Thingiverse.Printshop.deleteLayout=function(layout_id){var formData={};formData['layout_id']=layout_id;$.ajax({type:"POST",url:"/ajax/printshopexplorethings/delete_layout/",data:formData,complete:function(xhr){console.log(xhr.status+": "+xhr.responseText)
if(xhr.status==200)
document.location.reload();},dataType:'json'});}
Thingiverse.Printshop.makePublic=function(file_id){var formData={};formData['file_id']=file_id;$.ajax({type:"POST",url:"/ajax/printshopexplorethings/publish_slice_file/",data:formData,complete:function(xhr){console.log(xhr.status+": "+xhr.responseText)
if(xhr.status==200)
document.location.reload();},dataType:'json'});}
Thingiverse.Printshop.updateSlice=function(layout_id){var shell_element=document.getElementById('layout_'+layout_id+'_shells');var infill_element=document.getElementById('layout_'+layout_id+'_infill');var print_data=new Object();if(shell_element&&shell_element.value!='')
print_data['shells']=parseInt(shell_element.value);if(infill_element&&infill_element.value!='')
print_data['infill']=parseFloat(infill_element.value);var formData={};formData['layout_id']=layout_id;formData['print_data']=JSON.stringify(print_data);$.ajax({type:"POST",url:"/ajax/printshopexplorethings/update_slice/",data:formData,complete:function(xhr){console.log(xhr.status+": "+xhr.responseText)
if(xhr.status!=200)
alert('potential reslice error, check your log');},dataType:'json'});}
Thingiverse.Printshop.render=function(object_id){$.ajax({type:"POST",url:'/ajax/printshopexplorethings/printshop_render',data:{object_id:object_id,},complete:function(xhr){console.log(xhr.status+": "+xhr.responseText)},dataType:'json'});}