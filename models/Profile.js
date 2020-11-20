const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  //Special Fields "user" Zahir he user ki profile tan i gi jb wo register
  //huwa hoga is liye register hote huwe id bhi mili hogi isko to wo idhr
  // i gi
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    // Seniour Developer , junioer Developer ,Student
    type: String,
    required: true,
  },
  skills: {
    // Php,java,react etc
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        //past/current job
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        //if current true so its disable
        type: Date,
      },
      current: {
        type: String,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: String,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
