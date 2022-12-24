export const useDevice = () => {
  const isAndroid = Boolean((window as any).Capacitor.platform === 'android');
  const isElectron = Boolean(window.electron);

  return {
    isAndroid,
    isElectron,
  };
};
