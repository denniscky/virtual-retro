Template.PostIt.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('users');
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
  }
})

Template.PostIt.events({
  'click .btn-action': function() {
    Meteor.call('updatePostItFollowup', this._id, 'Action');
  },

  'click .btn-thank-you': function() {
    Meteor.call('updatePostItFollowup', this._id, 'Thank you');
  },

  'click .btn-edit': function() {
    Meteor.call('updatePostItFollowup', this._id, 'Thank you');
  },

  'click .btn-delete': function() {
    if (window.confirm("Delete this Post-It?")) { 
      Meteor.call('deletePostIt', this._id);
    }
  },

  'submit .post-it-comment-form': function(event) {
    event.preventDefault();
 
    const target = event.target;
    const comment = target.text.value;

    Meteor.call('updatePostItComment', this._id, comment);
  },
});
