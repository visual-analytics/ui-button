"use strict"
import { BaseModel as UIBaseModel } from "@visual-analytics/ui-base"
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
	UIBaseModel.call(this,_defaultConfig,_defaultState,_defaultContent,"b")
	//this.init(config,state,content)
}
UIButtonModel.prototype = Object.create(UIBaseModel.prototype); // Here's where the inheritance occurs
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
}
UIButtonModel.prototype.toggleSelect=function(){
	this.state.selected=!this.state.selected;
	this._checkStateContentChanged("state",!this.state.selected,this.state.selected,"select",{});
}
UIButtonModel.prototype.toggleDropdown=function(){
	this.state.dropdown=!this.state.dropdown;
	this._checkStateContentChanged("state",!this.state.dropdown,this.state.dropdown,"dropdown",{});
}
UIButtonModel.prototype.setConfiguration=function(config){
	//call parent
	UIBaseModel.prototype.setConfiguration.call(this,config);
	//make sure the type,shape,size,labelposition is how it should be
	this._checkConfigKeys();
}
UIButtonModel.prototype.setContent=function(key,value){
	var changed=UIBaseModel.prototype.setContent.call(this,key,value)
	//make sure labelVisible is set
	if(changed&&(typeof key==="object"||key==="label")){
		this.config.labelVisible=(this.content.label!=="");
	}
	return changed;
}
UIButtonModel.prototype._possibleConfigValues={
	type:["raised","flat"],
	shape:["normal","square","round"],
	size:["normal","dense"],
	labelPosition:["normal","right"]
}
UIButtonModel.prototype._checkConfigKeys=function(){
	Object.keys(this._possibleConfigValues).forEach(function(key){
		var currentValue=(""+this.config[key]).toLowerCase();
		this.config[key]=(~this._possibleConfigValues[key].indexOf(currentValue)?currentValue:this._possibleConfigValues[key][0])
	},this)
}



export default UIButtonModel;