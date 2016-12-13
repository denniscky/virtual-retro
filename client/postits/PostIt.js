Template.PostIt.onCreated(function() {
  this.isEditingComment = new ReactiveVar();
  this.autorun(() => {
    this.subscribe('users');
  });
});

Template.PostIt.helpers({
  isCreatedByUser: function() {
    return Meteor.userId() === this.author;
  },

  authorName: function() {
    // TODO: This is run twice... bad (because subscription is not waited on)
    return (Meteor.users.findOne({_id: this.author}) || {}).username;
  },

  followUpIsAction: function() {
    return (this.followUp === 'Action');
  },

  btnActionClass: function() {
    return (this.followUp === 'Action') ? "btn-primary" : "btn-default";
  },

  btnThankYouClass: function() {
    return (this.followUp === 'Thank you') ? "btn-primary" : "btn-default";
  },

  isEditingComment: function() {
    return Template.instance().isEditingComment.get();
  }
})

Template.PostIt.events({
  'click .btn-action': function() {
    Meteor.call('updatePostItFollowup', this._id, 'Action');
    Template.instance().isEditingComment.set(true);
  },

  'click .btn-thank-you': function() {
    Meteor.call('updatePostItFollowup', this._id, 'Thank you');
  },

  'click .btn-edit': function() {
    Template.parentData().modalDataReactive.set({ editRecord: this });
    $('#postItModal').modal('show');
  },

  'click .btn-delete': function() {
    if (window.confirm("Delete this Post-It?")) { 
      Meteor.call('deletePostIt', this._id);
    }
  },

  'click .btn-edit-comment': function() {
    Template.instance().isEditingComment.set(true);
  },

  'submit .post-it-comment-form': function(event) {
    event.preventDefault();
 
    const target = event.target;
    const comment = target.comment.value;
    const responsible = target.responsible.value;

    Meteor.call('updatePostItComment', this._id, comment, responsible);
    Template.instance().isEditingComment.set(false);
  },
});
