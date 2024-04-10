import mongoose from 'mongoose';


const feedSchema = new mongoose.Schema({
  CurrentuseId: {
        type: String,
        required: true
      },
  name: {
    type: String,
    required: true
  },
Email: {
    type: String, 
    required: true
  },
  type: {
    type: String, 
    required: true
  },
  descrp: {
    type: String,
    required: true
  },
  
});


const feed = mongoose.model('feed', feedSchema);

export default  feed;
