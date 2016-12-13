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
      if (this.isInsert) {
        return this.userId;
      }
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
		type: String,    
		autoform: { placeholder: "You can use emojis like :cat: :dog: ..." }
	},
	createdAt: {
		type: Date,
		autoValue: () => {
      if (this.isInsert) {
			  return new Date();
      }
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
	},
	followUpResponsible: {
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

	updatePostItComment: function(id, followUpComment, followUpResponsible) {
		PostIts.update(id, {
			$set: {
				followUpComment: followUpComment,
				followUpResponsible: followUpResponsible
			}
		});
	},

	deletePostIt: function(id) {
		PostIts.remove(id);
	}
});
