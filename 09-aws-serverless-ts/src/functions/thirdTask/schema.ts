export default {
  type: "object",
  properties: {
    array: { type: 'string' },
    n: { type: 'string' },
  },
  required: ['array', 'n']
} as const;
