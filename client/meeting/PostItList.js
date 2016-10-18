Template.PostItList.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam('id');
		self.subscribe('postIts', id);
	});
});

// Template.PostItList.events({
// 	'click .new-recipe': function() {
// 		Session.set('newRecipe', true);
// 	}
// });

Template.PostItList.helpers({
	postIts: () => {
		return PostIts.find({});
	}
});