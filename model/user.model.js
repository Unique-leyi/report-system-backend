const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    reportId: {
        type: Schema.Types.ObjectId,
        ref: "Report",
    }

});

module.exports = mongoose.model("User", UserSchema);
