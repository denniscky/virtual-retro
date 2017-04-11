Template.PostItsIndex.onCreated(function() {
  this.modalData = new ReactiveVar();
	this.autorun(() => {
		let meetingId = FlowRouter.getParam('meetingId');
		this.subscribe('postIts', meetingId);
    this.subscribe('meeting', meetingId);
	});
});

Template.PostItsIndex.onRendered(function() {
  $('#postItModal').on('hidden.bs.modal', (e) => {
    this.modalData.set({ editRecord: null });
  });
});

Template.PostItsIndex.helpers({
  meeting: () => {
    let meetingId = FlowRouter.getParam('meetingId');
    return Meetings.findOne({_id: meetingId});
  },

  modalData: function() {
    return Template.instance().modalData.get();
  },

  modalDataReactive: function() {
    return Template.instance().modalData;
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
      $('#postItModal').modal('hide');
    },
    onError: function(formType, error) {
      console.log(error);
    }
  },

  updatePostItForm: {
    onSuccess: function(formType, result) {
      $('#postItModal').modal('hide');
    },
    onError: function(formType, error) {
      console.log(error);
    }
  }
});