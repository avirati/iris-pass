export const useDevice = () => {
  const isMobile = Boolean((window as any).Capacitor.platform !== 'web');

  return {
    isMobile,
  };
};
