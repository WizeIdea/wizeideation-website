declare module 'remark-html' {
  const html: any;
  export default html;
}declare module 'remark' {
  /** The main factory function – returns a processor */
  export function remark(): any;
  // (optional) also allow a default import for safety
  const _default: any;
  export default _default;
}