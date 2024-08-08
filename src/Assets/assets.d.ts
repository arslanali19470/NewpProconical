declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

// Add this to handle the assets module
declare module '../../../assets' {
  export const NavImage2: string;
  export const ProsConsImage: string;
}
