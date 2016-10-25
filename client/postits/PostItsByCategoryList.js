Template.PostItsByCategoryList.helpers({
	postItsByCategory: (category) => {
		return PostIts.find({ category: category });
	}
});