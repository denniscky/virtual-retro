Meetings = new Mongo.Collection('Meetings');

Meetings.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

Schema = {};

Schema.Meeting = new SimpleSchema({
	date: {
		type: Date
	},
	isActive: {
		type: Boolean,
		defaultValue: false
	}
});

Meetings.attachSchema(Schema.Meeting);