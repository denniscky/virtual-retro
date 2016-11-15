Template.PostItsIndex.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let meetingId = FlowRouter.getParam('meetingId');
		self.subscribe('postIts', meetingId);
    self.subscribe('meeting', meetingId);
	});
});

Template.PostItsIndex.helpers({
  meeting: () => {
    let meetingId = FlowRouter.getParam('meetingId');
    return Meetings.findOne({_id: meetingId});
  }
});

AutoForm.hooks({
  insertPostItForm: {
    before: {
      insert: function (doc) {
        doc.meeting = FlowRouter.getParam('meetingId');
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      $('#myModal').modal('hide');
    }
  }
});