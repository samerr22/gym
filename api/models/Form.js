import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    
    },
    name: {
      type: String,
      required: true,
 
    },
    phone: {
        type: Number,
        required: true,
   
      },
    desc: {
        type: String,
        required: true,
   
      },
    
  },
  { timestamps: true }
);

const Form = mongoose.model('Form', FormSchema);

export default Form;