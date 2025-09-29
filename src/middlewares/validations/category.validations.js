import { body } from "express-validator";

export const createCategoryValidation = [
  // TODO: completar las validaciones para crear una categoria
  body("name")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios")
    .custom(async (value) => {
      const { CategoryModel } = await import("../../models/mongoose/category.model.js");
      const existingCategory = await CategoryModel.findOne({ name: value });
      if (existingCategory) {
        throw new Error("El nombre de la categoría ya está en uso");
      }
      return true;
    }),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede exceder los 500 caracteres")
];
