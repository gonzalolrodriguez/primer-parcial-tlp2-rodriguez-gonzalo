import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categories.controller.js";
import { createCategoryValidation } from "../middlewares/validations/category.validations.js";
import { validator } from "../middlewares/validator.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const categoryRoutes = Router();

// TODO: proteger las rutas con middlewares de autenticación y autorización faltantes

// * crear una categoria (usuario autenticado que sea admin)
categoryRoutes.post("/categories", authMiddleware, adminMiddleware, createCategoryValidation, validator, createCategory);

// * obtener todas las categorias (usuario autenticado)
categoryRoutes.get("/categories", authMiddleware, getAllCategories);

// * eliminar una categoria por id (usuario autenticado que sea admin)
categoryRoutes.delete("/categories/:id", authMiddleware, adminMiddleware, deleteCategory);
