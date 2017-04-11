Template.Meeting.events({
  'click .btn-finalize': function() {
    if (window.confirm("Finalize this retro?")) {
      Meteor.call('finalizeMeeting', this.meeting._id);
      FlowRouter.go('post-its-index', {meetingId: this.meeting._id});
    }
  },

  'click .btn-edit': function() {
    this.modalDataReactive.set({ editRecord: this.meeting });
    $('#meetingModal').modal('show');
  },

  'click .btn-delete': function() {
    if (window.confirm("Delete this Retro?")) {
      Meteor.call('deleteMeeting', this.meeting._id);
    }
  },
});



