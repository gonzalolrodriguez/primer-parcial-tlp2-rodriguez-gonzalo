import { body } from "express-validator";

export const createAssetValidation = [
  // TODO: completar las validaciones para crear un recurso
  body("inventory_number")
    .notEmpty()
    .withMessage("El número de inventario es requerido")
    .matches(/^INV-[0-9]{6}$/)
    .withMessage("El número de inventario debe tener formato: INV-123456")
    .custom(async (value) => {
      const { AssetModel } = await import("../../models/mongoose/asset.model.js");
      const existingAsset = await AssetModel.findOne({ inventoryNumber: value });
      if (existingAsset) {
        throw new Error("El número de inventario ya está en uso");
      }
      return true;
    }),

  body("description")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripción debe tener entre 10 y 500 caracteres"),

  body("brand")
    .isLength({ min: 2, max: 100 })
    .withMessage("La marca debe tener entre 2 y 100 caracteres"),

  body("model")
    .isLength({ min: 2, max: 100 })
    .withMessage("El modelo debe tener entre 2 y 100 caracteres"),

  body("status")
    .optional()
    .isIn(["good", "regular", "bad", "out_of_service"])
    .withMessage("El estado debe ser: good, regular, bad o out_of_service"),

  body("acquisition_date")
    .isISO8601()
    .withMessage("La fecha de adquisición debe ser una fecha válida")
    .custom((value) => {
      const today = new Date();
      const acquisitionDate = new Date(value);
      if (acquisitionDate > today) {
        throw new Error("La fecha de adquisición no puede ser futura");
      }
      return true;
    })
    .toDate(),

  body("acquisition_value")
    .isNumeric()
    .withMessage("El valor de adquisición debe ser un número")
    .isFloat({ min: 1 })
    .withMessage("El valor de adquisición debe ser mayor a 0"),

  body("responsible_id")
    .notEmpty()
    .withMessage("El responsable es requerido")
    .isMongoId()
    .withMessage("El responsable debe ser un ID de MongoDB válido")
    .custom(async (value) => {
      const { UserModel } = await import("../../models/mongoose/user.model.js");
      const user = await UserModel.findById(value);
      if (!user || user.deletedAt) {
        throw new Error("El responsable debe ser un usuario activo");
      }
      return true;
    }),

  body("categories")
    .isArray({ min: 1 })
    .withMessage("Debe seleccionar al menos una categoría")
    .custom(async (value) => {
      if (!Array.isArray(value)) return false;
      const { CategoryModel } = await import("../../models/mongoose/category.model.js");
      const validIds = value.every(id => typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/));
      if (!validIds) {
        throw new Error("Todas las categorías deben ser IDs de MongoDB válidos");
      }
      const categories = await CategoryModel.find({ _id: { $in: value } });
      if (categories.length !== value.length) {
        throw new Error("Todas las categorías deben existir");
      }
      return true;
    })
];

