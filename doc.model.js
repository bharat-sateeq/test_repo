const mongoose = require("mongoose");

const docSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: Number,
            required: true,
        },
        emailId: {
            type: String,
            required: true,
        },
        fathersName: {
            type: String,
            required: true,
        },
        residentialAddress: {
            type: String,
            required: true,
        },
        bankAccountNumber: {
            type: String,
            required: true,
        },
        bankIfscCode: {
            type: String,
            required: true,
        },
        upiId: String,
        adhaarCardFront: String,
        adhaarCardBack: String,
        panCard: String,
        identityProof: String,
        proofOfResidence: String,
        passportSizePhoto: String,
    },
    {
        timestamps: false,
    }
);

/**
 * @typedef Doc
 */
const Doc = mongoose.model("Document", docSchema);

module.exports = Doc;
