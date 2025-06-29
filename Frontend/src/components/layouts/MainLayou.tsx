
// import React, { ReactNode, useEffect } from 'react';
// import { Navbar } from '../navigation/Navbar';
// import { useLocation } from 'react-router-dom';
// import { cn } from '@/lib/utils';

// interface MainLayoutProps {
//   children: ReactNode;
//   className?: string;
//   withPadding?: boolean;
// }

// export const MainLayout: React.FC<MainLayoutProps> = ({ 
//   children, 
//   className,
//   withPadding = true
// }) => {
//   const location = useLocation();
  
//   // Scroll to top on route change
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
      
//       <main className={cn(
//         "flex-grow w-full",
//         withPadding && "px-4 pt-6 pb-16 sm:px-6 md:px-8 lg:px-10",
//         className
//       )}>
//         <div className="animate-fade-in w-full">
//           {children}
//         </div>
//       </main>
      
//       <footer className="py-8 px-4 bg-muted/50 border-t">
//         <div className="container max-w-7xl">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="mb-4 md:mb-0">
//               <p className="text-sm text-muted-foreground">
//                 © {new Date().getFullYear()} WisdomWave. All rights reserved.
//               </p>
//             </div>
//             <div className="flex space-x-6">
//               <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Privacy Policy
//               </a>
//               <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Terms of Service
//               </a>
//               <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Contact Us
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };
