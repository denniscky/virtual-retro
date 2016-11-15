Template.PostItsByCategoryList.helpers({
	postItsByCategory: function(category) {
    console.log("by cat", this);
		return PostIts.find({ category: category });
	}
});