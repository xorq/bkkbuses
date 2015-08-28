
var app = {
	initialize: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	onDeviceReady: function() {
		app.receivedEvent('deviceready');
	},

	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');
		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');
		console.log('Received Event: ' + id);
	},

	drawResult: function(t, field, link, title){
		$('#result').empty();
		_.each(t, function(a, b){

					template = '\
					<ul class="ui-listview" data-role="listview" data-type="horizontal">\
						<li class="ui-first-child ui-last-child">\
							<a <a href="#' + link + '?' + a.replace(/ /g,'.') + '" data-role="button" data-transition="slide" class="btn-game-name ui-btn ui-icon-carat-r ui-btn-icon-right">' + a + ' </a>\
						</li>\
					</ul>\
					'
			field.append(template);
		})
		$('.ui-title').html(title);
	},

	index: function(){
		self = this;
		$('#bus-number-index').on('keyup', function(){
			self.drawResult(window.busSearch.findBus($('#bus-number-index').val())['inbound'], $('#result'), 'dest', $('#bus-number-index').val())
		})
		$('#bus-number-index').val('');
		setTimeout(function(){$('#bus-number-index').focus()},100)
	},

	dest: function(event, args){
		var destination = args.input.replace(/\./g,' ').substr(6,args.input.length -1)
		$('h1').html(destination);
		this.drawResult(window.busSearch.busesForDestination(destination), $('#result2'), 'bus', destination)
	},

	bus: function(event, args){
		this.index();
		var busNumber = args[0].split('?')[1];
		self.drawResult(window.busSearch.findBus(busNumber)['inbound'], $('#result3'), 'dest', busNumber)
	}

};

var router = new $.mobile.Router([
		{ "#bus[?]\\d+": {handler: "bus", events:"bs"} },
		{ "#dest[?]\\S+": {handler: "dest", events:"bs"} },
		{ "": "index" }
], app);



