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
		autoform: {
			type: "hidden"
		}
	},
	meeting: {
		type: String
	},
	category: {
		type: String,
		allowedValues: ["Celebration", "Happy", "Sad", "Idea"]
	},
	text: {
		type: String,
		autoform: {
			rows: 5
		}
	}
});

PostIts.attachSchema(Schema.PostIt);