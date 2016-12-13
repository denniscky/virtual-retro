Template.MeetingsIndex.onCreated(function() {
  this.modalData = new ReactiveVar();
	this.autorun(() => {
		this.subscribe('meetings');
	});
});

Template.MeetingsIndex.helpers({
	pastMeetings: () => {
		return Meetings.find({ isActive: false }, {sort: {createdAt: -1}});
	},

	activeMeetings: () => {
		return Meetings.find({ isActive: true }, {sort: {title: 1}});
	},

  modalData: () => {
    return Template.instance().modalData.get();
  }
});

Template.MeetingsIndex.events({
  'click .btn-new-meeting': function() {
    Template.instance().modalData.set({ editRecord: null });
    $('#meetingModal').modal('show');
  }
});

AutoForm.hooks({
  insertMeetingForm: {
    onSuccess: function(formType, result) {
      $('#meetingModal').modal('hide');
    }
  },

  updateMeetingForm: {
    onSuccess: function(formType, result) {
      $('#meetingModal').modal('hide');
    }
  }
});