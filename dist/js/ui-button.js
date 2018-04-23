/**
* @preserve
* https://github.com/visual-analytics/ui-button.git Version 0.0.5.
*  Copyright 2018 Gregory Beirens.
*  Created on Mon, 23 Apr 2018 07:46:37 GMT.
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@visual-analytics/ui-base'), require('xassist')) :
	typeof define === 'function' && define.amd ? define(['exports', '@visual-analytics/ui-base', 'xassist'], factory) :
	(factory((global.xv = global.xv || {}),global.xv,global.xa));
}(this, (function (exports,uiBase,xassist) { 'use strict';

var _defaultConfig={
		type:"raised",
		shape:"normal",
		size:"normal",
		labelVisible:false,
		labelPosition:"normal",
		isChild:false,
		downlight:false,
		highlight:false,
		colorInverse:false,
		selectable:false,
		dropdown:false
	},
	_defaultState={
		disabled:false,
		selected:false,
		hasFocus:false,
		visible:true,
		dropdown:false,
		clicked:false
	},
	_defaultContent={
		label:"",
		image:"",
		description:""
	};

function UIButtonModel(){
	//baseClass.call(this)
	uiBase.BaseModel.call(this,_defaultConfig,_defaultState,_defaultContent,"b");
	//this.init(config,state,content)
}
UIButtonModel.prototype = Object.create(uiBase.BaseModel.prototype); // Here's where the inheritance occurs
UIButtonModel.prototype.constructor = UIButtonModel;

UIButtonModel.prototype.onClick=function(){
	if(this.config.dropdown){
		this.toggleDropdown();
	}
	else if(this.config.selectable){
		this.toggleSelect();
	}
	else{
		this._checkStateContentChanged("state",false,true,'click',{});
	}
};
UIButtonModel.prototype.toggleSelect=function(){
	this.state.selected=!this.state.selected;
	this._checkStateContentChanged("state",!this.state.selected,this.state.selected,"select",{});
};
UIButtonModel.prototype.toggleDropdown=function(){
	this.state.dropdown=!this.state.dropdown;
	this._checkStateContentChanged("state",!this.state.dropdown,this.state.dropdown,"dropdown",{});
};
UIButtonModel.prototype.setConfiguration=function(config){
	//call parent
	uiBase.BaseModel.prototype.setConfiguration.call(this,config);
	//make sure the type,shape,size,labelposition is how it should be
	this._checkConfigKeys();
};
UIButtonModel.prototype.setContent=function(key,value){
	var changed=uiBase.BaseModel.prototype.setContent.call(this,key,value);
	//make sure labelVisible is set
	if(changed&&(typeof key==="object"||key==="label")){
		this.config.labelVisible=(this.content.label!=="");
	}
	return changed;
};
UIButtonModel.prototype._possibleConfigValues={
	type:["raised","flat"],
	shape:["normal","square","round"],
	size:["normal","dense"],
	labelPosition:["normal","right"]
};
UIButtonModel.prototype._checkConfigKeys=function(){
	Object.keys(this._possibleConfigValues).forEach(function(key){
		var currentValue=(""+this.config[key]).toLowerCase();
		this.config[key]=(~this._possibleConfigValues[key].indexOf(currentValue)?currentValue:this._possibleConfigValues[key][0]);
	},this);
};

function UIButtonView(containerElm){
	
	xassist.EventDispatcher.call(this);
	uiBase.BaseView.call(this,"xButton",containerElm);
	this.registerEvents();
	//this.init(config,content)
}
//we lose the instance of, but this is a little tradeOff for the
UIButtonView.prototype = Object.create(xassist.EventDispatcher.prototype); // Here's where the inheritance occurs
//UIButtonView.prototype = Object.create(EventDispatcher.prototype); // Here's where the inheritance occurs
xassist.object(UIButtonView.prototype).assign(uiBase.BaseView.prototype); // this instanceof UIBaseView===false!!!
UIButtonView.prototype.constructor = UIButtonView;



UIButtonView.prototype.registerEvents=function(){
	this.registerEvent("click");
};
UIButtonView.prototype.createElement=function(config,content){
	var btn=document.createElement("button"),me=this;
	btn.id=config.id;
	btn.className=this.getClassName(config);
	btn.innerHTML=this.getContent(content,config);
	btn.addEventListener("click",function(e){
		me.fire("click",e);
	});
	return btn;
};
UIButtonView.prototype.getContent=function(content,config){
	var result="";
	result+=(config.labelVisible? "<div class='xLabel'>"+content.label+"</div>":"");
	result+=(content.image!==""?this.createImage(content.image):"");
	result+=(config.dropdown?this.createImage("",true):"");
	return result;
};
UIButtonView.prototype.setLabel=function(labelText){
	var cont=this.element.getElementsByClassName('xLabel');
	if(cont.length>0){
		cont[0].innerHTML=labelText;
	}
	//to do else create label???
};
UIButtonView.prototype.createImage=function(image,dropDown){
	if(!dropDown){
		return "<div class='xImage fas fa-"+image+"'></div>";
	}
	return "<div class='xDropDownIcon fas fa-caret-down'></div>";
};
UIButtonView.prototype.getClassName=function(config){
	var className="";
	if(!config.isChild){
		//type Button
		className=(config.type==="flat"?"xFlatButton":"xRaisedButton");
		//shape button
		if(config.shape==="square"){
			className+=" xSquareButton";
		}
		else if(config.shape==="round"){
			className+=" xRoundButton";
		}
		//size button
		className+=(config.size==="dense"?" xDenseButton":"");
	}
	else{
		className="xChildButton";
	}
	className+=(config.colorInverse?" xInversedColor":"");
	className+=((config.labelPosition==="right" && config.shape==="normal")?" xLabelPositionRight":"");
	className+=(config.selectable?" xSelectButton":"");	
	className+=(config.dropdown?" xDropdown":"");
	className+=(config.highlight?" xHighlight":"");
	className+=(config.downlight?" xDownlight":"");
	return className;
};
UIButtonView.prototype.setState=function(state){
	this.disable(state.disabled);
	this.select(state.selected);
	this.show(state.visible);
};
UIButtonView.prototype.show=function(visible){
	if (visible){
		xassist.dom(this.element).removeClass('xHidden');
	}
	else{
		xassist.dom(this.element).addClass('xHidden');
	}
};
UIButtonView.prototype.disable=function(disabled){
	if (disabled){
		this.element.setAttribute('disabled',true);
	}
	else{
		this.element.removeAttribute('disabled');
	}
};
UIButtonView.prototype.select=function(selected){
	if (selected){
		this.element.setAttribute('data-selected',true);
	}
	else{
		this.element.setAttribute('data-selected',false);
	}
};

function UIButtonController(model,view){
	//model.init(config,state,content);
	//var view=new UIButtonView(containerElm,model.getConfiguration(),model.getContent());
	uiBase.BaseController.call(this,model,view);
}
UIButtonController.prototype = Object.create(uiBase.BaseController.prototype); // Here's where the inheritance occurs
UIButtonController.prototype.constructor = uiBase.BaseController;

UIButtonController.prototype.addListeners=function(){
	this.model.on("stateChanged",function(state){
		this.view.setState(this.model.getState());
		this.fire("change",state);
	},this);
	this.model.on("contentChanged",function(){
		//test
	},this);
	this.view.on("click",function(){
		this.model.onClick();
	},this);
};

function buttonFactory(type,shape,size,options,containerElm,config,state,content){
	var m= new UIButtonModel();
	m.setConfiguration({
		type:type,
		shape:shape,
		size:size
	});
	m.setConfiguration(options);
	var v=new UIButtonView(containerElm);
	var c= new UIButtonController(m,v);
	c.init(config,state,content);
	return c;
	
}

var button=buttonFactory.bind(null,"","","",{});
button.select=buttonFactory.bind(null,"","","",{selectable:true});
button.dropdown=buttonFactory.bind(null,"","","",{dropdown:true});
button.flat=buttonFactory.bind(null,"flat","","",{});
button.flat.select=buttonFactory.bind(null,"flat","","",{selectable:true});
button.flat.dropdown=buttonFactory.bind(null,"flat","","",{dropdown:true});
button.flat.square=buttonFactory.bind(null,"flat","square","",{});
button.flat.select=buttonFactory.bind(null,"flat","square","",{selectable:true});
button.flat.dropdown=buttonFactory.bind(null,"flat","square","",{dropdown:true});
button.square=buttonFactory.bind(null,"","square","",{});
button.square.select=buttonFactory.bind(null,"","square","",{selectable:true});
button.square.dropdown=buttonFactory.bind(null,"","square","",{dropdown:true});

exports.button = button;

Object.defineProperty(exports, '__esModule', { value: true });

})));
