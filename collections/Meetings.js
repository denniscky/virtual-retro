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
	  }
	},
	isActive: {
		type: Boolean,
		defaultValue: true,
		autoform: { type: "hidden" }
	},
  isDeleted: {
    type: Boolean,
    optional: true,
    autoform: { type: "hidden" }
  },
	createdAt: {
		type: Date,
		autoValue: function() {
      if (this.isInsert) {
			  return new Date();
      }
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

  deleteMeeting: function(id) {
    Meetings.update(id, {
      $set: {
        isDeleted: true
      }
    });
  }
});
