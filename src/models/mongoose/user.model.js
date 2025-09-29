import { model, Schema } from "mongoose";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    deletedAt: { type: Date, default: null },
    // ! FALTA COMPLETAR ACA
    profile: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true }
    }
  },
  { timestamps: true }
);

// ! FALTA COMPLETAR ACA
// Virtual para populate inverso con assets
UserSchema.virtual('assets', {
  ref: 'Asset',
  localField: '_id',
  foreignField: 'responsible'
});

// Asegurar que los virtuals se incluyan en JSON
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

export const UserModel = model("User", UserSchema);
