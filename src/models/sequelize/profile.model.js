import { DataTypes } from "sequelize";
// import sequelize from '../config/database.js'; // Descomentar cuando se configure la conexión

export const ProfileModel = sequelize.define("Profile", {
  employee_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  first_name: { type: DataTypes.STRING(50), allowNull: false },
  last_name: { type: DataTypes.STRING(50), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
});

// TODO: Relación uno a uno con User (1 User tiene 1 Profile)
// * 1:1 Profile ↔ User
// * 'profile' (User) y 'user' (Profile)
// ! FALTA COMPLETAR ACA
// ProfileModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });

// Índices para optimizar consultas del sistema judicial
ProfileModel.addHook('afterSync', () => {
  ProfileModel.addIndex({
    fields: ['employee_number'],
    unique: true,
    name: 'profile_employee_number_unique'
  });
  ProfileModel.addIndex({
    fields: ['userId'],
    name: 'profile_user_id_index'
  });
});
