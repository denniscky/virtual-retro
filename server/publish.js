Meteor.publish('postIts', function(meetingId) {
	return PostIts.find({meeting: meetingId});
});
