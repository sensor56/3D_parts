var Thingiview=function(dom_element,desired_width,desired_height){if(typeof(dom_element)=='undefined')
dom_element=document.body;if(typeof(desired_width)=='undefined')
desired_width=window.innerWidth;if(typeof(desired_height)=='undefined')
desired_height=window.innerHeight;this.desired_width=desired_width;this.desired_height=desired_height;this.width=desired_width;this.height=desired_height;this.models=[];this.fogColor=0xcacaca;this.scale=1;this.parent_element=dom_element;this.visible=false;this.fullscreen=false;this._init();}
Thingiview.prototype.resize=function(width,height)
{this.width=width;this.height=height;this.camera.aspect=width/height;this.camera.updateProjectionMatrix();this.renderer.setSize(width,height);}
Thingiview.prototype._init=function(dom_element){this.container=document.createElement('div');this.container.style.width=this.width+"px";this.container.style.height=this.height+"px";this.container.style.WebkitTouchCallout="none";this.container.style.WebkitUserSelect="none";this.container.style.KhtmlUserSelect="none";this.container.style.MozUserSelect="none";this.container.style.userSelect="none";this.container.style.display="none";this.container.style.backgroundColor="#"+this.fogColor.toString(16);this.parent_element.appendChild(this.container);if(!Detector.webgl){Detector.addGetWebGLMessage({"parent":this.container});return;}
this._initThreeScene();this._initHTMLControls();}
Thingiview.prototype._initThreeScene=function()
{this.scene=new THREE.Scene();this.camera=new THREE.PerspectiveCamera(37.8,this.width/this.height,1,100000);this.camera.position.z=300;this.camera.position.y=-500;this.camera.position.x=-500;this.camera.up=new THREE.Vector3(0,0,1);this.controls=new THREE.NormalControls(this.camera,this.container);this.reflectCamera=new THREE.CubeCamera(0.1,5000,512);this.scene.add(this.reflectCamera);var material=new THREE.MeshPhongMaterial({color:0xffffff,emissive:0xffffff,shading:THREE.SmoothShading,fog:false,side:THREE.BackSide});var skybox=new THREE.Mesh(new THREE.CubeGeometry(1000,1000,1000),material);skybox.name='skybox';this.scene.add(skybox);var groundPlaneMaterial=new THREE.MeshPhongMaterial({color:0x888888,wireframe:false,envMap:this.reflectCamera.renderTarget});var x=1000;var y=1000;var division_x=Math.floor(x/10);var division_y=Math.floor(y/10);this.plane=new THREE.Mesh(new THREE.PlaneGeometry(x,y,division_x,division_y),groundPlaneMaterial);this.plane.name='plane';this.plane.receiveShadow=true;this.scene.add(this.plane);this.wirePlane=new THREE.Mesh(new THREE.PlaneGeometry(x,y,division_x,division_y),new THREE.MeshPhongMaterial({emissive:0xEEEEEE,color:0x000000,wireframe:true,wireframeLinewidth:2}));this.wirePlane.name='planewire';this.wirePlane.receiveShadow=true;this.wirePlane.position.z=this.plane.position.z+.01;this.scene.add(this.wirePlane);this.scene.fog=new THREE.FogExp2(this.fogColor,0.007);this.renderer=new THREE.WebGLRenderer();this.renderer.setSize(this.width,this.height);this.container.appendChild(this.renderer.domElement);this._initLights();}
Thingiview.prototype._initHTMLControls=function()
{var self=this;this.fullscreenBtn=document.createElement("div");this.fullscreenBtn.setAttribute("class","thing-page-image-opts");this.fullscreenBtn.innerHTML='<button type="button" class="largeview-btn" title="Toggle Largeview"></button>';this.fullscreenBtn.style.position="absolute";this.fullscreenBtn.style.top="10px";this.fullscreenBtn.style.right="10px";this.fullscreenBtn.addEventListener('click',function(){self.toggleFullscreen();});this.toggleThingiviewBtn=document.createElement("div");this.toggleThingiviewBtn.setAttribute("class","thing-page-image-opts");this.toggleThingiviewBtn.innerHTML='<button type="button" class="thingiview-btn enabled" title="Exit Thingiview"><span>Exit</span></button>';this.toggleThingiviewBtn.style.position="absolute";this.toggleThingiviewBtn.style.top="10px";this.toggleThingiviewBtn.style.right="50px";this.toggleThingiviewBtn.addEventListener('click',function(){self.hide();if(self.fullscreen)
self.toggleFullscreen();});this.container.appendChild(this.fullscreenBtn);this.container.appendChild(this.toggleThingiviewBtn);}
Thingiview.prototype._initLights=function()
{this.spotLight=new THREE.SpotLight(0xffffff,.7,0);this.spotLight.position.set(-700,1000,1000);this.spotLight.castShadow=false;this.scene.add(this.spotLight);this.pointLights=[];pointLight=new THREE.PointLight(0xffaaff,0.7,0);pointLight.position.set(3200,-3900,3500);this.scene.add(pointLight);this.pointLights.push(pointLight);}
Thingiview.prototype.centerCamera=function(){var sceneCenter=undefined;var sceneObjects=0;var sceneBox=new THREE.Box3();this.scene.traverse(function(object){if(object instanceof THREE.Mesh)
{if(object.name=="skybox"||object.name=="plane"||object.name=="planewire")
return;sceneObjects+=1;object.geometry.computeBoundingBox();object.geometry.boundingBox.min.applyMatrix4(object.matrixWorld);object.geometry.boundingBox.max.applyMatrix4(object.matrixWorld);object.geometry.boundingBox.min.x+=object.position.x;object.geometry.boundingBox.min.y+=object.position.y;object.geometry.boundingBox.min.z+=object.position.z;object.geometry.boundingBox.max.x+=object.position.x;object.geometry.boundingBox.max.y+=object.position.y;object.geometry.boundingBox.max.z+=object.position.z;var objectCenter=object.geometry.boundingBox.center();objectCenter.z/=2;sceneBox.min.x=Math.min(sceneBox.min.x,object.geometry.boundingBox.min.x);sceneBox.min.y=Math.min(sceneBox.min.y,object.geometry.boundingBox.min.y);sceneBox.min.z=Math.min(sceneBox.min.z,object.geometry.boundingBox.min.z);sceneBox.max.x=Math.max(sceneBox.max.x,object.geometry.boundingBox.max.x);sceneBox.max.y=Math.max(sceneBox.max.y,object.geometry.boundingBox.max.y);sceneBox.max.z=Math.max(sceneBox.max.z,object.geometry.boundingBox.max.z);if(sceneCenter===undefined)
newCenter=objectCenter.clone();else
{var newCenter=new THREE.Vector3();newCenter.sub(objectCenter,sceneCenter);newCenter.divideScalar(sceneObjects+1);newCenter.add(sceneCenter);}
sceneCenter=newCenter;}});this.controls.desiredCameraTarget=sceneCenter;this.controls.desiredCameraTarget.x=this.controls.desiredCameraTarget.y=0;var distanceX=(sceneBox.max.x-sceneBox.min.x)/2/Math.tan(this.controls.camera.fov*this.controls.camera.aspect*Math.PI/360);var distanceY=(sceneBox.max.y-sceneBox.min.y)/2/Math.tan(this.controls.camera.fov*this.controls.camera.aspect*Math.PI/360);var distanceZ=(sceneBox.max.z-sceneBox.min.z)/2/Math.tan(this.controls.camera.fov*Math.PI/360);var distance=Math.max(Math.max(distanceX,distanceY),distanceZ);distance*=1.7*this.scale;var cameraPosition=this.controls.target.clone().sub(this.camera.position).normalize().multiplyScalar(distance);this.controls.desiredCameraPosition=sceneCenter.clone().sub(cameraPosition);this.controls.maxDistance=distance*10;}
Thingiview.prototype.addModel=function(geometry)
{var obj,i;material=new THREE.MeshPhongMaterial({wrapAround:true,wrapRGB:new THREE.Vector3(0,1,1),color:0x0D8DFF,specular:0xA0A0A0,shading:THREE.SmoothShading,shininess:150,fog:false,side:THREE.DoubleSide});var mesh=new THREE.Mesh(geometry,material);mesh.geometry.computeBoundingBox();var dims=mesh.geometry.boundingBox.max.clone().sub(mesh.geometry.boundingBox.min);maxDim=Math.max(Math.max(dims.x,dims.y),dims.z);this.scale=100/maxDim;mesh.position.x=-(mesh.geometry.boundingBox.min.x+mesh.geometry.boundingBox.max.x)/2*this.scale;mesh.position.y=-(mesh.geometry.boundingBox.min.y+mesh.geometry.boundingBox.max.y)/2*this.scale;mesh.position.z=-mesh.geometry.boundingBox.min.z*this.scale;this.scene.add(mesh);this.models.push(mesh);for(var i=0;i<this.models.length;i++)
this.models[i].scale.x=this.models[i].scale.y=this.models[i].scale.z=this.scale;this.wirePlane.scale.x=this.wirePlane.scale.y=this.wirePlane.scale.z=this.scale;this.plane.scale.x=this.plane.scale.y=this.plane.scale.z=this.scale;this.centerCamera();}
Thingiview.prototype.clearScene=function()
{for(var i=0;i<this.models.length;i++)
{this.scene.remove(this.models[i]);}
this.models=[];}
Thingiview.prototype.loadModelJson=function(url)
{var loader=new THREE.JSONLoader(true);loader.statusDomElement.style.left="0px";loader.statusDomElement.style.width="auto";this.parent_element.appendChild(loader.statusDomElement);var self=this;loadCallback=function(geometry,materials){self.addModel(geometry);self.parent_element.removeChild(loader.statusDomElement);};loader.load(url,loadCallback);}
Thingiview.prototype.render=function()
{if(!this.visible)
return;var now=Date.now();if(this.lastRenderTime==undefined)
this.timeElapsed=0;else
this.timeElapsed=now-this.lastRenderTime;this.lastRenderTime=now;this.controls.dirty=false;this.controls.update(this.timeElapsed);this.reflectCamera.position.z=-this.camera.position.z;this.reflectCamera.position.y=this.camera.position.y;this.reflectCamera.position.x=this.camera.position.x;this.scene.traverse(function(object){if(object.name=="plane"||object.name=="planewire")
object.visible=false;if(object.name=="skybox")
object.visible=true;});this.reflectCamera.updateCubeMap(this.renderer,this.scene);this.scene.traverse(function(object){if(object.name=="plane"||object.name=="planewire")
object.visible=true;if(object.name=="skybox")
object.visible=false;});this.renderer.render(this.scene,this.camera);}
Thingiview.prototype.show=function(){this.container.style.display="block";this.visible=true;}
Thingiview.prototype.hide=function(){this.container.style.display="none";this.visible=false;}
Thingiview.prototype.toggleFullscreen=function()
{if(this.fullscreen){this.fullscreen=false;document.body.removeChild(this.container);this.parent_element.appendChild(this.container);this.container.style.position="static";this.container.style.top="0px";this.container.style.width=this.desired_width+"px";this.container.style.height=this.desired_height+"px";this.toggleThingiviewBtn.style.top="10px";this.fullscreenBtn.style.top="10px";this.fullscreenBtn.childNodes[0].setAttribute("class","largeview-btn");document.body.removeChild(this.fullscreenBtn);document.body.removeChild(this.toggleThingiviewBtn);this.container.appendChild(this.fullscreenBtn);this.container.appendChild(this.toggleThingiviewBtn);this.resize(parseInt(this.container.style.width),parseInt(this.container.style.height));}else{this.fullscreen=true;this.parent_element.removeChild(this.container);document.body.appendChild(this.container);this.container.style.position="absolute";this.container.style.top="61px";this.container.style.width="100%";this.container.style.height="608px";if(typeof(mw)!='undefined')
{this.container.style.top="40px";this.container.style.height="619px";}
this.toggleThingiviewBtn.style.top="71px";this.fullscreenBtn.style.top="71px";this.fullscreenBtn.childNodes[0].setAttribute("class","largeview-btn");this.fullscreenBtn.childNodes[0].setAttribute("class","largeview-btn enabled");this.container.removeChild(this.fullscreenBtn);this.container.removeChild(this.toggleThingiviewBtn);document.body.appendChild(this.fullscreenBtn);document.body.appendChild(this.toggleThingiviewBtn);this.resize(parseInt(window.innerWidth),parseInt(this.container.style.height));}}
Thingiview.prototype.hideButtons=function()
{if(this.fullscreen){document.body.removeChild(this.fullscreenBtn);document.body.removeChild(this.toggleThingiviewBtn);}else{this.container.removeChild(this.fullscreenBtn);this.container.removeChild(this.toggleThingiviewBtn);}}