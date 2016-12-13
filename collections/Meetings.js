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
	title: {
		type: String,
	  custom: function () {
	    if (Meteor.isClient && this.isSet) {
	      Meteor.call("meetingIsTitleAvailable", this.value, function (error, result) {
	        if (!result) {
	          Meteor.meetings
	          	.simpleSchema()
	          	.namedContext("insertMeetingForm")
	          	.addInvalidKeys([{name: "title", type: "notUnique"}]);
	        }
	      });
	    }
	  }
	},
	isActive: {
		type: Boolean,
		defaultValue: true,
		autoform: { type: "hidden" }
	},
	createdAt: {
		type: Date,
		autoValue: () => {
			return new Date();
		},
		autoform: { type: "hidden" }
	}
});

Meetings.attachSchema(Schema.Meeting);

Meteor.methods({
	finalizeMeeting: function(id) {
		Meetings.update(id, {
			$set: {
				isActive: false
			}
		});
	},


});
