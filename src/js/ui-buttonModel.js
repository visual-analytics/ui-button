"use strict"
import { BaseModel as UIBaseModel } from "@visual-analytics/ui-base"
var _defaultConfig={
		type:"raised",
		shape:"normal",
		size:"normal",
		labelVisible:false,
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
UIButtonModel.prototype._buttonTypes=["raised","flat"];
UIButtonModel.prototype.setType=function(type){
	type=type||"";
	type=(~this._buttonTypes.indexOf(type.toLowerCase())?
		type.toLowerCase():this._buttonTypes[0]);
	this.config.type=type;
}
UIButtonModel.prototype._buttonShapes=["normal","square","round"];
UIButtonModel.prototype.setShape=function(shape){
	shape=shape||"";
	shape=(~this._buttonShapes.indexOf(shape.toLowerCase())?
		shape.toLowerCase():this._buttonShapes[0]);
	this.config.shape=shape;
}
UIButtonModel.prototype._buttonSizes=["normal","dense"];
UIButtonModel.prototype.setSize=function(size){
	size=size||"";
	size=(~this._buttonSizes.indexOf(size.toLowerCase())?
		size.toLowerCase():this._buttonSizes[0]);
	this.config.size=size;
}




export default UIButtonModel;