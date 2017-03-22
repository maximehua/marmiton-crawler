
FlowRouter.route('/:function/:variables', {
	action: function(param) {
		console.log(param.function, param.variables);
		Meteor.call("sendToParticle",param.function, param.variables, function(){
			window.history.back();			
		});
	}
});

FlowRouter.route('/', {
	action: function() {
		console.log("/");
	}
});
