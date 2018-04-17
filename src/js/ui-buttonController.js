"use strict"
import { BaseController as UIBaseController } from "@visual-analytics/ui-base"
import { default as UIButtonModel } from "./ui-buttonModel.js"
import { default as UIButtonView } from "./ui-buttonView.js"
function UIButtonController(model,view){
	//model.init(config,state,content);
	//var view=new UIButtonView(containerElm,model.getConfiguration(),model.getContent());
	UIBaseController.call(this,model,view);
}
UIButtonController.prototype = Object.create(UIBaseController.prototype); // Here's where the inheritance occurs
UIButtonController.prototype.constructor = UIBaseController;

function buttonFactory(type,shape,size,options,containerElm,config,state,content){
	var m= new UIButtonModel()
	m.setType(type);
	m.setShape(shape);
	m.setSize(size);
	m.setConfiguration(options);
	var v=new UIButtonView(containerElm)
	var c= new UIButtonController(m,v)
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


export default button;