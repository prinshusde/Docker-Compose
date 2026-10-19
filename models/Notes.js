import {Schema, model} from 'mongoose';


const noteSchema = new Schema({
    note:{
        type: String,
    },
},
  {
    timestamps: true,
  }
);

const Note = model('Note', noteSchema);

export default Note;