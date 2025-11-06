import React, { ReactNode } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  Menu, 
  LogOut,
  Bell,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  moduleType: 'store' | 'cedis' | 'handheld';
  navigation: Array<{
    name: string;
    href: string;
    icon: React.ElementType;
    active?: boolean;
  }>;
  userName?: string;
  userRole?: string;
}

const Layout = ({ 
  children, 
  title, 
  subtitle, 
  moduleType, 
  navigation, 
  userName = "Usuario", 
  userRole = "Admin" 
}: LayoutProps) => {
  const navigate = useNavigate();
  
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const moduleColors = {
    store: "bg-store text-store-foreground",
    cedis: "bg-cedis text-cedis-foreground",
    handheld: "bg-handheld text-handheld-foreground"
  };
  
  const moduleGradient = {
    store: "from-store/80 to-store",
    cedis: "from-cedis/80 to-cedis",
    handheld: "from-handheld/80 to-handheld"
  };

  const userInitials = userName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex h-screen flex-col">
      {/* Top navigation bar */}
      <header className={`bg-gradient-to-r ${moduleGradient[moduleType]} shadow-md z-10`}>
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            <div className="text-white">
              <h1 className="text-xl font-bold">{title}</h1>
              {subtitle && <p className="text-xs opacity-80">{subtitle}</p>}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={`${moduleColors[moduleType]}`}>
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userRole}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation - desktop */}
        <aside className={`hidden md:flex w-64 flex-col border-r bg-card`}>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-8 flex items-center justify-center">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/")}
              >
                <Home className="mr-2 h-4 w-4" />
                Página Principal
              </Button>
            </div>
            
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center rounded-md px-3 py-2 text-sm font-medium 
                    ${item.active 
                      ? `bg-${moduleType}/10 text-${moduleType}` 
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <item.icon 
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${item.active ? `text-${moduleType}` : 'text-foreground'}`} 
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/")}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cambiar Rol
            </Button>
          </div>
        </aside>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 z-40 w-64 bg-card overflow-y-auto">
              <div className="p-4">
                <div className="mb-8 flex justify-center">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate("/");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Página Principal
                  </Button>
                </div>
                
                <nav className="flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        group flex items-center rounded-md px-3 py-2 text-sm font-medium 
                        ${item.active 
                          ? `bg-${moduleType}/10 text-${moduleType}` 
                          : 'text-foreground hover:bg-muted'
                        }
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon 
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${item.active ? `text-${moduleType}` : 'text-foreground'}`} 
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="p-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/");
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cambiar Rol
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;