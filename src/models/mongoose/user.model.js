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
      employee_number: { type: String, required: true, unique: true },
      first_name: { type: String, required: true, minlength: 2, maxlength: 50 },
      last_name: { type: String, required: true, minlength: 2, maxlength: 50 },
      phone: { type: String }
    }
  },
  {
    timestamps: true,
    // Configurar índices para optimizar consultas del sistema judicial
    indexes: [
      { "profile.employee_number": 1 },
      { email: 1 },
      { username: 1 },
      { deletedAt: 1 }
    ]
  }
);

// ! FALTA COMPLETAR ACA
// Virtual para populate inverso con assets - relación 1:N User → Asset
UserSchema.virtual('assets', {
  ref: 'Asset',
  localField: '_id',
  foreignField: 'responsible'
});

// Asegurar que los virtuals se incluyan en JSON
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

export const UserModel = model("User", UserSchema);
