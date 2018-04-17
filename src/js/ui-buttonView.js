"use strict"
import { BaseView as UIBaseView } from "@visual-analytics/ui-base"
import { EventDispatcher,element } from "xassist"

function UIButtonView(containerElm){
	
	EventDispatcher.call(this)
	UIBaseView.call(this,"xButton",containerElm)
	this.registerEvents()
	//this.init(config,content)
}
//we lose the instance of, but this is a little tradeOff for the
UIButtonView.prototype = Object.create(EventDispatcher.prototype); // Here's where the inheritance occurs
//UIButtonView.prototype = Object.create(EventDispatcher.prototype); // Here's where the inheritance occurs
Object.assign(UIButtonView.prototype, UIBaseView.prototype); // this instanceof UIBaseView===false!!!
UIButtonView.prototype.constructor = UIButtonView;



UIButtonView.prototype.registerEvents=function(){
	this.registerEvent("click");
}
UIButtonView.prototype.createElement=function(config,content){
	var btn=document.createElement("button"),me=this;
	btn.id=config.id;
	btn.className=this.getClassName(config);
	btn.innerHTML=this.getContent(content,config);
	btn.addEventListener("click",function(e){
		me.fire("click",e);
	})
	return btn;
}
UIButtonView.prototype.getContent=function(content,config){
	var result=""
	result+=(config.labelVisible? "<div class='bLabel'>"+content.label+"</div>":"");
	result+=(content.image!==""?this.createImage(content.image):"");
	result+=(config.dropdown?this.createImage("",true):"");
	return result;
}
UIButtonView.prototype.setLabel=function(labelText){
	var cont=this.element.getElementsByClassName('bLabel');
	if(cont.length>0){
		cont[0].innerHTML=labelText;
	}
	//to do else create label???
}
UIButtonView.prototype.createImage=function(image,dropDown){
	if(!dropDown){
		return "<div class='bImage fa fa-"+image+"'></div>";
	}
	return "<div class='bDropDownIcon fa fa-caret-down'></div>";
}
UIButtonView.prototype.getClassName=function(config){
	var className="";
	if(!config.isChild){
		//type Button
		className=(config.type==="flat"?"xFlatButton":"xRaisedButton")
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
	className+=(config.selectable==="selectable"?" xSelectButton":"")	
	className+=(config.dropdown==="dropdown"?" xDropdown":"");
	className+=(config.highlight?" xHighlight":"");
	className+=(config.downlight?" xDownlight":"");
	return className;
}
UIButtonView.prototype.setState=function(state){
	this.disable(state.disabled);
	this.select(state.selected);
	this.show(state.visible);
}
UIButtonView.prototype.show=function(visible){
	if (visible){
		element(this.element).removeClass('xHidden');
	}
	else{
		element(this.element).addClass('xHidden');
	}
}
UIButtonView.prototype.disable=function(disabled){
	if (disabled){
		this.element.setAttribute('disabled',true);
	}
	else{
		this.element.removeAttribute('disabled');
	}
}
UIButtonView.prototype.select=function(selected){
	if (selected){
		this.element.setAttribute('data-selected',true);
	}
	else{
		this.element.setAttribute('data-selected',false);
	}
}
export default UIButtonView;