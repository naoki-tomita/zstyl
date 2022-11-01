globalThis.document = {
  createElement: jest.fn(),
  body: {
    appendChild: jest.fn(),
  },
  head: {
    appendChild: jest.fn(),
  }
} as any;
