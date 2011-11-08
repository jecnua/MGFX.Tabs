/*
---
script: tabs.js
description: MGFX.Tabs, extension of base class that adds tabs to control the rotater. 
authors: Sean McArthur (http://seanmonstar.com) 
license: MIT-style license 
requires:
 core/1.3.0: [Event, Element.Event, Fx.CSS]
 more/1.3.0.1: [Fx.Elements]
provides: [MGFX.Tabs]
...
*/

//MGFX.Tabs. Copyright (c) 2008-2011 Sean McArthur <http://seanmonstar.com/>, MIT Style License.

if(!window.MGFX) MGFX = {};

MGFX.Tabs = new Class({
	
	Extends: MGFX.Rotater,
	
	options: {
		autoplay: false,
		onShowSlide: function(slideIndex) {
			this.tabs.removeClass('active');
			this.tabs[slideIndex].addClass('active');
		}
	},
	
	initialize: function(tabs, slides, options){
		this.tabs = $$(tabs);
		this.createTabs();
		//Save
		this.instanceTarget = tabs;
		//Get Cookie
		var positionCookie = getCookie(tabs);
		//Check
		if (positionCookie != null && positionCookie != ""){
			options.startIndex = positionCookie;
		}
		//We do not use hash
		//if(options.hash && window.location.hash) {
		//	this.getHashIndex(options);
		//}
		return this.parent(slides,options);
	},
	
	createTabs: function () {
		var that = this;
		this.tabs.forEach(function(tab,index){
			//need index, thats why theres the forEach
			tab.addEvent('click', function(event){
				//Set Cookie
				setCookie(that.instanceTarget,index);
				event.preventDefault();
				that.showSlide(index);
				that.stop(true);
			});
		});
	}.protect(),
	
	getHashIndex: function(options) {
		var hash = window.location.hash.substring(1);
		this.tabs.forEach(function(el, index) {
			if(el.get('id') == hash) {
				options.startIndex = index;
			}
		});
	}.protect()
	
});

if(!window.Tabs) var Tabs = MGFX.Tabs;

//Very simple cookie management function (source html.it)

function setCookie(c_name,value,exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0; i<ARRcookies.length; i++) {
	  x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x = x.replace(/^\s+|\s+$/g,"");
	  if (x == c_name){
		return unescape(y);
	  }
	}
}