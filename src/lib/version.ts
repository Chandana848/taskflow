export const APP_VERSION = '1.0.0';
export const APP_NAME = 'TaskFlow';
export const RELEASE_DATE = '2026-11-20';
export const BUILD_TARGET = 'production';

export function getAppInfo() {
  return {
    name: APP_NAME,
    version: APP_VERSION,
    releaseDate: RELEASE_DATE,
    buildTarget: BUILD_TARGET,
  };
}
