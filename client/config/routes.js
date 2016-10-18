FlowRouter.route('/:id/list', {
	name: 'post-it-list',
	action() {
		BlazeLayout.render('MainLayout', {mainTemplate: 'PostItList'});
	}
});