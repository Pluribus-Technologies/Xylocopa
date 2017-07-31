module.exports = function(mongoose) {
    const userSchema = mongoose.Schema({
        name: String,
        company: Number
    }, {
        timestamps: true
    });
    return userSchema;
}