// create Schema
module.exports = function(mongoose) {
    const accountSchema = mongoose.Schema({
        organization: String,
        location: {
            address1: String,
            address2: String,
            city: String,
            state: String,
            postalCode: String,
            country: String
        },
        contact: {
            firstName: String,
            lastName: String,
            phone: String,
            email: String
        },
        webURL: String
    }, {
        timestamps: true
    });
    return accountSchema;
}
