const mongoose = require("mongoose");

const videoDetailsSchema = mongoose.Schema({
    videoLink: { type: String, required: true },
    videoName: { type: String, required: true },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    uploadDate: { type: Date },
    thumbnailPath: {
        type: String,
    },
}, { collection: 'video-details' });

module.exports = mongoose.model("VideoDetails", videoDetailsSchema);
