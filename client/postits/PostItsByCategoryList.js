Template.PostItsByCategoryList.helpers({
	postItsByCategory: function(category) {
		return PostIts.find({ category: category });
	}
});

Template.PostItsByCategoryList.events({
  'click .btn-new-post-it': function() {
    $('#myModal').modal('show');
    $('select[name="category"]').val(this.category);
  }
});