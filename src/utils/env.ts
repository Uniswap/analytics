export function isStagingEnv(): boolean {
    return Boolean(process.env.REACT_APP_STAGING)
  }
  
  export function isProductionEnv(): boolean {
    return process.env.NODE_ENV === 'production' && !isStagingEnv()
  }
  