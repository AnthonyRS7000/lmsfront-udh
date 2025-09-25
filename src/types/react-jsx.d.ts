// Auxiliar local para que VSCode y TypeScript reconozcan JSX runtime y elementos intrínsecos
// Este archivo es un parche local y seguro: si las dependencias están bien instaladas
// y el editor configura correctamente `@types/react`, puede eliminarse.

declare namespace JSX {
  // Elemento básico
  interface Element {}
  // Aceptar cualquier elemento HTML/SVG para evitar errores de 'IntrinsicElements'
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// También intentar exportar el runtime para que la importación "react/jsx-runtime" sea detectable
declare module "react/jsx-runtime" {
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export function jsxDEV(type: any, props?: any, key?: any): any;
}
