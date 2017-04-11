Template.MeetingsIndex.onCreated(function() {
  this.modalData = new ReactiveVar();
	this.autorun(() => {
		this.subscribe('meetings');
	});
});

Template.MeetingsIndex.onRendered(function() {
  $('#meetingModal').on('hidden.bs.modal', (e) => {
    this.modalData.set({ editRecord: null });
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
  },

  modalDataReactive: function() {
    return Template.instance().modalData;
  }
});

Template.MeetingsIndex.events({
  'click .btn-new-meeting': function() {
    $('#meetingModal').modal('show');
  }
});

AutoForm.hooks({
  insertMeetingForm: {
    onSuccess: function(formType, result) {
      $('#meetingModal').modal('hide');
    },
    onError: function(formType, error) {
      console.log(error);
    }
  },

  updateMeetingForm: {
    onSuccess: function(formType, result) {
      console.log("On success");
      $('#meetingModal').modal('hide');
    },
    onError: function(formType, error) {
      console.log(error);
    },
    before: {
      update: function(doc) {
        // I can't get around it: using autoform, a 'false' boolean is translated to 'unset this boolean'
        // So here is a workaround for you <3
        if (doc.$unset && (doc.$unset.isActive !== null)) {
          delete doc.$unset.isActive;
          doc.$set.isActive = false;
        }
        return doc;
      }
    }
  }
});