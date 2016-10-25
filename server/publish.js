Meteor.publish('postIts', function(meetingId) {
	check(meetingId, String);
	return PostIts.find({ meeting: meetingId });
});

Meteor.publish('meetings', function() {
	return Meetings.find({});
});

