export const getMenuIcon = (name: string) =>
  new URL(`../assets/images/menu/${name}`, import.meta.url).href
