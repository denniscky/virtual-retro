Template.MeetingsIndex.onCreated(function() {
	let self = this;
	self.autorun(function() {
		self.subscribe('meetings');
	});
});

Template.MeetingsIndex.helpers({
	pastMeetings: () => {
		return Meetings.find({ isActive: false });
	},

	activeMeeting: () => {
		return Meetings.findOne({ isActive: true });
	}
});