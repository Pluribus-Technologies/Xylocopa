module.exports = function(mongoose) {
    const companySchema = mongoose.Schema({
        id: String,
        name: String
    }, {
        timestamps: true
    });
    return companySchema;
}