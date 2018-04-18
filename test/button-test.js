var definition = require("../package.json");
var { button } =require("../"+definition.main);
var tape=require("tape");

var jsdom = require("jsdom");
var doc=new jsdom.JSDOM("<!DOCTYPE html><div id='container'></h1>")
global.window=doc.window;
global.document =global.window.document;
var container=document.getElementById("container")

tape("button: creates new instance of UIButtonController", function(test){
	var b=button.select(container,{isChild:false,labelVisible:true});
	console.log(b)
	test.ok(true,
		"test1");
	test.end()
})