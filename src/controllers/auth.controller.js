import { UserModel } from "../models/mongoose/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    // TODO: crear usuario con password hasheada y profile embebido
    const { username, email, password, role, profile } = req.body;

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario con profile embebido - mapear campos del formato Postman al modelo
    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
      role,
      profile: {
        employee_number: profile.employeeNumber,
        first_name: profile.firstName,
        last_name: profile.lastName,
        phone: profile.phone
      }
    });

    await user.save();

    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await UserModel.findOne({ email, deletedAt: null });
    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Validar password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Firmar JWT
    const token = signToken({ id: user._id, role: user.role });

    // Setear cookie httpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000 // 1 hora
    });

    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    const userId = req.user.id;

    const user = await UserModel.findById(userId).select('-password');
    if (!user || user.deletedAt) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
