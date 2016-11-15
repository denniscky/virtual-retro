Template.PostItsByCategoryList.onCreated(function() {
  this.modalData = new ReactiveVar();
  this.autorun(() => {
    this.subscribe('users');
  });
});

Template.PostItsByCategoryList.helpers({
	postItsByCategory: function(category) {
		return PostIts.find({ category: category });
	},

  myPostItsByCategory: function(category) {
    return PostIts.find({ category: category, author: Meteor.userId() })
  },

  otherPostItsSummary: function(category) {
    let others = PostIts.find({ category: category, author: { $ne: Meteor.userId() } });
    let counts = _.chain(others.fetch())
      .groupBy(function(p) {
        return p.author;
      })
      .map(function(val, key) {
        let authorName = (Meteor.users.findOne({_id: key}) || {}).username;
        return {
          authorName: authorName,
          count: val.length
        };
      })
      .value();
    return counts;
  }
});

Template.PostItsByCategoryList.events({
  'click .btn-new-post-it': function() {
    this.modalDataVar.set({ editRecord: null });
    $('#postItModal').modal('show');
    $('select[name="category"]').val(this.category);
  }
});