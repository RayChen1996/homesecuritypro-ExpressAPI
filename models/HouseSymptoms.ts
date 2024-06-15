import mongoose, { Schema, Document, Types } from 'mongoose'
export interface IHouseSymptoms extends Document {
  _id: Types.ObjectId
  labelName: string
  createDT: Date
  updateDT: Date
}

const HouseSymptomsSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  labelName: { type: String, required: true },
  createDT: { type: Date, default: Date.now },
  updateDT: { type: Date, default: Date.now }
})

export default mongoose.model<IHouseSymptoms>('HouseSymptoms', HouseSymptomsSchema)
