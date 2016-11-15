Template.MeetingsIndex.onCreated(function() {
	this.autorun(() => {
		this.subscribe('meetings');
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