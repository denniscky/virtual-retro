Template.Meeting.events({
  'click .btn-finalize': function() {
    if (window.confirm("Finalize this retro?")) { 
      Meteor.call('finalizeMeeting', this._id);
      FlowRouter.go('post-its-index', {meetingId: this._id});
    }
  }
});


