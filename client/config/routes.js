Accounts.onLogin(function() {
	FlowRouter.go('meetings-index');
});

Accounts.onLogout(function() {
	FlowRouter.go('home');
});

FlowRouter.triggers.enter([function(context, redirect) {
	if (!Meteor.userId()) {
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/', {
	name: 'home',
	action() {
		if (Meteor.userId()) {
			FlowRouter.go('meetings-index');
		}
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/meetings/:meetingId/post-its', {
	name: 'post-its-index',
	action() {
		BlazeLayout.render('MainLayout', {mainTemplate: 'PostItsIndex'});
	}
});

FlowRouter.route('/meetings', {
	name: 'meetings-index',
	action() {
		BlazeLayout.render('MainLayout', {mainTemplate: 'MeetingsIndex'});
	}
});