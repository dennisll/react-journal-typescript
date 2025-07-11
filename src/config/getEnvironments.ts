


export const getEnvironments = () => {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  import.meta.env;

  return {
    ...import.meta.env
  }
}