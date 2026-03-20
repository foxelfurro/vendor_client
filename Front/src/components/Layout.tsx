import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Library, Package, LogOut, Gem, BadgeDollarSign, Shield } from 'lucide-react'; 
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext'; 

const Layout = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  // 1. Validación a prueba de balas (por si el backend manda 1 como número o "1" como texto)
  const userRole = authContext?.user?.rol;
  const isAdmin = String(userRole) === '1' || userRole === 'admin'; 

  // 2. Definir las rutas (Asegúrate de que esto esté ADENTRO del componente Layout)
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Catálogo Maestro', path: '/catalogo', icon: Library },
    { name: 'Mi Inventario', path: '/inventario', icon: Package },
    { name: 'Caja', path: '/caja', icon: BadgeDollarSign },
    // El botón mágico: Solo se agrega si isAdmin es true
    ...(isAdmin ? [{ name: 'Panel Admin', path: '/admin', icon: Shield }] : [])
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <aside className="w-64 bg-slate-950 text-slate-400 flex flex-col shadow-2xl z-10">
        <div className="p-6 flex items-center gap-3 text-white border-b border-slate-800/50">
          <Gem className="w-8 h-8 text-emerald-400" />
          <span className="text-xl font-bold tracking-wider">JoyeríaHub</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            // Usamos startsWith para que el botón siga iluminado si entras a sub-rutas
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;

 const userRole = authContext?.user?.rol;
  const isAdmin = String(userRole) === '1' || userRole === 'admin'; 

  // Agrega esto temporalmente para depurar:
  console.log("👤 Datos completos del usuario:", authContext?.user);
  console.log("🔑 Rol detectado:", userRole);
  console.log("🛡️ ¿Es Admin?:", isAdmin);

//...           
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="px-4 py-2 mb-2">
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              {isAdmin ? 'Administrador' : 'Vendedor'}
            </p>
            <p className="text-sm text-slate-300 truncate">
              {authContext?.user?.nombre || 'Usuario'}
            </p>
          </div>
          <button 
            onClick={authContext?.logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-left"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;