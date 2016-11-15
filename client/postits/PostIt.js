Template.PostIt.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('users');
  });
});

Template.PostIt.helpers({
  isCreatedByUser: function() {
    console.log("post", this.data, this);
    return Meteor.userId() === this.author;
  },

  authorName: function() {
    // TODO: This is run twice... bad (because subscription is not waited on)
    return (Meteor.users.findOne({_id: this.author}) || {}).username;
  }
})