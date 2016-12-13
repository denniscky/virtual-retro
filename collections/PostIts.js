PostIts = new Mongo.Collection('postIts');

PostIts.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

Schema = {};

Schema.PostIt = new SimpleSchema({
	author: {
		type: String,
		autoValue: function() {
			return this.userId;
		},
		autoform: { type: "hidden" }
	},
	meeting: {
		type: String,
		autoform: { type: "hidden" }
	},
	category: {
		type: String,
		allowedValues: ["Celebration", "Happy", "Sad", "Idea"]
	},
	text: {
		type: String
	},
	createdAt: {
		type: Date,
		autoValue: () => {
			return new Date();
		},
		autoform: { type: "hidden" }
	},
	followUp: {
		type: String,
		optional: true,
		allowedValues: ["Action", "Thank you"],
		autoform: { type: "hidden" }
	},
	followUpComment: {
		type: String,
		optional: true,
		autoform: { type: "hidden" }
	}
});

PostIts.attachSchema(Schema.PostIt);

Meteor.methods({
	updatePostItFollowup: function(id, followUp) {
		PostIts.update(id, {
			$set: {
				followUp: followUp
			}
		});
	},

	updatePostItComment: function(id, followUpComment, callback) {
		PostIts.update(id, {
			$set: {
				followUpComment: followUpComment
			}
		});
	},

	deletePostIt: function(id) {
		PostIts.remove(id);
	}
});
