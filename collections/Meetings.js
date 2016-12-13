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
	  	if (Meetings.find({ isActive: true, title: this.value }).count() > 0) {
        Meetings
        	.simpleSchema()
        	.namedContext("insertMeetingForm")
        	.addInvalidKeys([{name: "title", type: "notUnique"}]);
        return "notUnique";
	  	}
	    // if (Meteor.isClient && this.isSet) {
	    //   Meteor.call("meetingIsTitleAvailable", this.value, function (error, result) {
	    //     if (!result) {
	    //     	console.log("bad result!");
	    //       Meetings
	    //       	.simpleSchema()
	    //       	.namedContext("insertMeetingForm")
	    //       	.addInvalidKeys([{name: "title", type: "notUnique"}]);
	    //       return "notUnique";
	    //     }
	    //   });
	    // }
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
	}
});
