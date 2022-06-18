const {Schema,model}= require("mongoose")


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [4, "minimum 4 charecters"],
    maxlength: [25, "maximum 25 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return String(v)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },

  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 8
      },
      message: (props) => `${props.value} is not not greater than 8 charecters.`,
    },
  },
  roles: { type: [String], required: true, default: ["STUDENT"] },
  accountStatus: {
    type: String,
    required: true,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
  },
});


const User = model("User",userSchema)

module.exports=User