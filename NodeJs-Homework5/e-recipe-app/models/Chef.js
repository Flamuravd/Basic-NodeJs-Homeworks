import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Chef = mongoose.model('Chef', chefSchema);

export default Chef;