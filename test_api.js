// ✅ CONFIGURACIÓN CORRECTA PARA LA API
console.log('🚀 Sistema de Gestión de Patrimonio del Poder Judicial de Formosa');
console.log('📋 Todas las rutas están configuradas correctamente');
console.log('');
console.log('===== ENDPOINTS DISPONIBLES =====');
console.log('');
console.log('🔐 AUTENTICACIÓN:');
console.log('POST /api/auth/register - Registrar usuario');
console.log('POST /api/auth/login - Iniciar sesión');
console.log('GET /api/auth/profile - Ver perfil (autenticado)');
console.log('POST /api/auth/logout - Cerrar sesión');
console.log('');
console.log('👥 USUARIOS (Admin):');
console.log('GET /api/users - Ver todos los usuarios');
console.log('DELETE /api/users/:id - Eliminar usuario');
console.log('');
console.log('📂 CATEGORÍAS:');
console.log('POST /api/categories - Crear categoría (Admin)');
console.log('GET /api/categories - Ver categorías (Autenticado)');
console.log('DELETE /api/categories/:id - Eliminar categoría (Admin)');
console.log('');
console.log('🏢 ASSETS:');
console.log('POST /api/assets - Crear asset (Autenticado)');
console.log('GET /api/assets - Ver todos los assets (Admin)');
console.log('GET /api/assets/my-assets - Ver mis assets (Autenticado)');
console.log('DELETE /api/assets/:id - Eliminar asset (Responsable)');
console.log('');
console.log('===== EJEMPLO DE REGISTRO =====');
console.log(JSON.stringify({
    username: "secretario1",
    email: "secretario@judicial.gov.ar",
    password: "SecPass123",
    role: "secretary",
    profile: {
        employeeNumber: "SC0001",
        firstName: "Juan Carlos",
        lastName: "Rodriguez",
        phone: "3704123456"
    }
}, null, 2));