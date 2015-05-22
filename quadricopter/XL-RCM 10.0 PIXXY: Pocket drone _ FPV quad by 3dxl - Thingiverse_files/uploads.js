Thingiverse.Uploads=(function(){Thingiverse.Uploads=function(){var self=this;}
Thingiverse.Uploads.prototype={constructor:Thingiverse.Uploads,checkForm:function(form,callback)
{var file=form[0].file;if(file.files.length===1){form[0]['Content-Type'].value=file.files[0].type;if(file.files[0].type!='application/octet-stream'){form[0]['Content-Disposition'].value='';}
else{form[0]['Content-Disposition'].value='Content-disposition: attachment; filename='+ file.files[0].name;}
return callback();}
else{alert('You must select a file!');return false;}},checkFile:function(file,callback)
{console.log(file);return false;},createObjectURL:function(file,callback)
{var _url=((window.url===undefined)?window.webkitURL:window.url);var url=((_url===undefined)?window.URL:_url);if(url!==undefined){return callback(url.createObjectURL(file));}
else{return callback(false);}}}
return Thingiverse.Uploads;})();