const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const blogSchema = new Schema({
    title : {
        type : 'String',
        required : true,
    },
    imageUrl : {
        type : 'String',
        required : false,
    },
    author : {
        type : 'String',
        required : true,
    },
    category : {
        type : 'String',
        required : true,
    },
    description : {
        type : 'String',
        required : false,
    }, 
}
,
    { timestamps : true }
);

 module.exports = mongoose.model('Blog', blogSchema);