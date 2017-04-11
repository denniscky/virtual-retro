Meteor.publish('postIts', function(meetingId) {
	check(meetingId, String);
	return PostIts.find({ meeting: meetingId });
});

Meteor.publish('meetings', function() {
	return Meetings.find({isDeleted: {$ne: true}});
});

Meteor.publish('meeting', function(id) {
  check(id, String);
  return Meetings.find({ _id: id });
});

Meteor.publish('users', function() {
  // TODO: overpublishing
  // http://stackoverflow.com/questions/31365580/meteor-get-usernames-from-userid-easier-method
  return Meteor.users.find({});
});

Meteor.publish('emojis', function() {
  return Emojis.find();
});