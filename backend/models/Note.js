import mongoose from 'mongoose';
const {Schema}=mongoose; 
const NotesSchema = new Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require:true,

    },
    tag:{
        type:String,
        default: "General"
    },
    date:{
        type:Date,
        default: Date.now
    }
  });

  const Note = mongoose.model('notes',NotesSchema);
//   export default router;
export default Note;