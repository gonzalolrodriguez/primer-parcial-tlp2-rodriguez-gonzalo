import { body } from "express-validator";

export const createUserValidation = [
  // TODO: completar las validaciones para crear un usuario
  body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("El username solo puede contener letras, números y guiones bajos")
    .custom(async (value) => {
      const { UserModel } = await import("../../models/mongoose/user.model.js");
      const existingUser = await UserModel.findOne({ username: value, deletedAt: null });
      if (existingUser) {
        throw new Error("El username ya está en uso");
      }
      return true;
    }),

  body("email")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail()
    .custom(async (value) => {
      const { UserModel } = await import("../../models/mongoose/user.model.js");
      const existingUser = await UserModel.findOne({ email: value, deletedAt: null });
      if (existingUser) {
        throw new Error("El email ya está en uso");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("La contraseña debe contener al menos una mayúscula, una minúscula y un número"),

  body("role")
    .optional()
    .isIn(["secretary", "administrator"])
    .withMessage("El rol debe ser 'secretary' o 'administrator'"),

  body("profile.employeeNumber")
    .notEmpty()
    .withMessage("El número de empleado es requerido")
    .matches(/^[A-Z]{2}[0-9]{4}$/)
    .withMessage("El número de empleado debe tener formato: 2 letras mayúsculas seguidas de 4 números")
    .custom(async (value) => {
      const { UserModel } = await import("../../models/mongoose/user.model.js");
      const existingUser = await UserModel.findOne({ "profile.employee_number": value, deletedAt: null });
      if (existingUser) {
        throw new Error("El número de empleado ya está en uso");
      }
      return true;
    }),

  body("profile.firstName")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/)
    .withMessage("El nombre solo puede contener letras"),

  body("profile.lastName")
    .notEmpty()
    .withMessage("El apellido es requerido")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/)
    .withMessage("El apellido solo puede contener letras"),

  body("profile.phone")
    .optional()
    .matches(/^[+]?[0-9\s\-\(\)]{8,15}$/)
    .withMessage("Debe ser un número de teléfono válido")
];
