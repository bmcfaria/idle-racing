export const displayResponsivePanel = condition => [
  condition ? "none" : "flex",
  condition ? "none" : "flex",
  "flex"
];

export const ATTRIBUTE_TYPES = {
  ACCELERATION: 'acceleration',
  TOP_SPEED: 'topSpeed',
  HANDLING: 'handling',
}