import { useState } from "react";



export const useCustomLayout = () => {
  
    const [mobileOpen, setMobileOpen] = useState(false);
      const [isClosing, setIsClosing] = useState(false);
    
      const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
      };
    
      const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
      };
    
      const handleDrawerToggle = () => {
        if (!isClosing) {
          setMobileOpen(!mobileOpen);
        }
        //console.log(mobileOpen)
      };

      return {
        mobileOpen,
        isClosing,
        handleDrawerClose,
        handleDrawerToggle,
        handleDrawerTransitionEnd
      }
}
