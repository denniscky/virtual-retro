FlowRouter.route('/meetings/:meetingId/list', {
	name: 'post-it-list',
	action() {
		BlazeLayout.render('MainLayout', {mainTemplate: 'PostItsList'});
	}
});

FlowRouter.route('/meetings', {
	name: 'meetings-index',
	action() {
		BlazeLayout.render('MainLayout', {mainTemplate: 'MeetingsIndex'});
	}
});