var Uploadify=(function(o){var Uploadify=function(o){this.upload(o);};var errorHandler;Uploadify.prototype={constructor:Uploadify,verify:function(o)
{if(typeof o.error==='function'){errorHandler=o.error;}
if(this.empty(o.des)){this.throwError('No upload destination specified');}
if(this.empty(o.cross_domains)){o.cross_domains=false;}
if(!this.empty(o.mimes)){this.verifyMimeTypes(o);}
return o;},info:{percent:0,uploaded:0,total:0,files:[]},upload:function(o)
{if(!window.FormData){return this.throwFallback(o,'no_formdata');}
var self=this;var $o=self.verify(o);var data=self.addData($o.src,$o.params);$.ajax({url:$o.des,async:true,data:data,method:'POST',cache:false,contentType:false,processData:false,headers:$o.headers,crossDomain:$o.cross_domain,xhr:function(){var xhr=$.ajaxSettings.xhr();if(!xhr.upload){$o.progress(false);self.throwFallback($o,'no_progress');}
else{xhr.upload.addEventListener('progress',function(progress){var loaded=(progress.loaded||progress.position);var total=(progress.totalSize||progress.total);var percentage=Math.ceil((loaded/total)*100);self.info.percent=percentage;self.info.uploaded=loaded;self.info.total=total;if(typeof $o.progress==='function'){$o.progress(percentage,progress);}},false);xhr.addEventListener('abort',function(){self.throwError('abort');},false);}
return xhr;},success:function(data,text_status,jqXHR){if(typeof $o.success==='function'){return $o.success(data,self.info,text_status,jqXHR);}},error:function(jqXHR,textStatus,errorThrown){self.throwError(textStatus,errorThrown,jqXHR);}});},addData:function(src,params)
{var self=this;var data=new FormData();var files=$(src)[0].files;self.info.files=[];$.each(files,function(i,file){self.info.files.push(file);data.append('file_'+ i,file);});if(!this.empty(params)){for(key in params){data.append(key,params[key]);}}
return data;},verifyMimeTypes:function(o)
{var self=this;var files=$(o.src)[0].files;$.each(files,function(i,file){if(o.mimes.indexOf(file.type)===-1){self.throwError('Bad Mime Type: '+ file.type);}});},empty:function(input)
{switch(input){case undefined:return true;break;case'':return true;break;case null:return true;break;default:if(input.length===0){return true;}
return false;break;}},throwError:function(msg)
{if(typeof errorHandler==='function'){errorHandler(msg);}
throw new Error(msg);},throwFallback:function(o,msg)
{if(typeof o.fallback==='function'){return o.fallback(msg);}}};return Uploadify;})();