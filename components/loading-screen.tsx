"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export function LoadingScreen({ isLoading, onLoadingComplete }: LoadingScreenProps) {
  const [showLoading, setShowLoading] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        onLoadingComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(true);
    }
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          className="loading-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center space-y-4">
            {/* Loading Spinner */}
            <motion.div
              className="loading-spinner"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Loading Text */}
            <motion.div
              className="text-sm text-muted-foreground font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              Loading Dashboard...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to manage loading state - very fast
export function useLoadingState() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Very minimal loading time for smooth UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Just 100ms for smooth transition

    return () => clearTimeout(timer);
  }, []);

  return { isLoading, setIsLoading };
}
