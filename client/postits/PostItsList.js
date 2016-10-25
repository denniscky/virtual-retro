Template.PostItsList.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let meetingId = FlowRouter.getParam('meetingId');
		self.subscribe('postIts', meetingId);
	});
});

// Template.PostItList.events({
// 	'click .new-recipe': function() {
// 		Session.set('newRecipe', true);
// 	}
// });