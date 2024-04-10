import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    tilte: {
      type: String,
      required: true,
    
    },
    desc: {
      type: String,
      required: true,
 
    },
    
    
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;