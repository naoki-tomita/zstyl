import { BlockParser, IdentifierParser, IdentifiersParser, LocalStyleParser, NestedStyleParser, SelectorParser, StyleParser } from "../BNFStyledParser";
describe("IdentifierParser", () => {
  const tests = [
    {
      input: "",
      expected: { remaining: "" },
    },
    {
      input: "foo",
      expected: {
        ast: {
          type: "Identifier",
          name: "foo",
        },
        remaining: ""
      },
    },
    {
      input: "foo bar",
      expected: {
        ast: {
          type: "Identifier",
          name: "foo",
        },
        remaining: " bar"
      },
    },
    {
      input: ",foo bar",
      expected: {
        remaining: ",foo bar"
      },
    },
    {
      input: " foo bar ",
      expected: {
        ast: {
          type: "Identifier",
          name: "foo"
        },
        remaining: " bar "
      }
    }
  ]

  tests.forEach(({ input, expected }) => {
    it(`should be parsed. "${input}"`, () => {
      const actual = IdentifierParser.parse(input)
      expect(actual).toEqual(expected);
    });
  });
});

describe("IdentifiersParser", () => {
  const tests = [
    {
      input: "",
      expected: { remaining: "" },
    },
    {
      input: "foo",
      expected: {
        ast: {
          type: "Identifiers",
          values: [
            { type: "Identifier", name: "foo" }
          ]
        },
        remaining: ""
      },
    },
    {
      input: "foo bar",
      expected: {
        ast: {
          type: "Identifiers",
          values: [
            { type: "Identifier", name: "foo" },
            { type: "Identifier", name: "bar" }
          ]
        },
        remaining: ""
      },
    },
    {
      input: ",foo bar",
      expected: {
        remaining: ",foo bar"
      },
    },
    {
      input: " foo bar ",
      expected: {
        ast: {
          type: "Identifiers",
          values: [
            { type: "Identifier", name: "foo" },
            { type: "Identifier", name: "bar" }
          ]
        },
        remaining: " "
      }
    },
    {
      input: " foo bar;",
      expected: {
        ast: {
          type: "Identifiers",
          values: [
            { type: "Identifier", name: "foo" },
            { type: "Identifier", name: "bar" }
          ]
        },
        remaining: ";"
      }
    }
  ]

  tests.forEach(({ input, expected }) => {
    it(`should be parsed. "${input}"`, () => {
      const actual = IdentifiersParser.parse(input)
      expect(actual).toEqual(expected);
    });
  });
});

describe("StyleParser", () => {
  const tests = [
    {
      input: "",
      expected: { remaining: "" },
    },
    {
      // identifier
      input: "foo",
      expected: {
        remaining: "foo"
      },
    },
    {
      // identifier with colon
      input: "foo:",
      expected: {
        remaining: "foo:"
      },
    },
    {
      // identifier with colon and semicolon
      input: "foo: ;",
      expected: {
        remaining: "foo: ;"
      },
    },
    {
      // valid Style
      input: "foo: bar",
      expected: {
        ast: {
          type: "Style",
          prop: {
            type: "Identifier",
            name: "foo"
          },
          values: {
            type: "Identifiers",
            values: [
              { type: "Identifier", name: "bar" },
            ]
          }
        },
        remaining: ""
      }
    },
    {
      input: " foo: bar hoge ;",
      expected: {
        ast: {
          type: "Style",
          prop: {
            type: "Identifier",
            name: "foo"
          },
          values: {
            type: "Identifiers",
            values: [
              { type: "Identifier", name: "bar" },
              { type: "Identifier", name: "hoge" },
            ]
          }
        },
        remaining: " ;"
      }
    }
  ]

  tests.forEach(({ input, expected }) => {
    it(`should be parsed. "${input}"`, () => {
      const actual = StyleParser.parse(input)
      expect(actual).toEqual(expected);
    });
  });
});

describe("LocalStyleParser", () => {
  const tests = [
    {
      input: " foo: bar hoge ; foo: bar;",
      expected: {
        ast: {
          type: "LocalStyle",
          prop: {
            type: "Identifier",
            name: "foo"
          },
          values: {
            type: "Identifiers",
            values: [
              { type: "Identifier", name: "bar" },
              { type: "Identifier", name: "hoge" },
            ]
          }
        },
        remaining: " foo: bar;"
      }
    }
  ]

  tests.forEach(({ input, expected }) => {
    it(`should be parsed. "${input}"`, () => {
      const actual = LocalStyleParser.parse(input)
      expect(actual).toEqual(expected);
    });
  });
});

describe("SelectorParser", () => {
  const tests = [
    {
      input: "",
      expected: {
        remaining: ""
      },
    },
    {
      input: "hoge",
      expected: {
        ast: {
          type: "Selector",
          value: "hoge",
        },
        remaining: ""
      }
    },
    {
      input: "hoge { ... }",
      expected: {
        ast: {
          type: "Selector",
          value: "hoge",
        },
        remaining: " { ... }"
      }
    },
    {
      input: "#hoge",
      expected: {
        ast: {
          type: "Selector",
          value: "#hoge",
        },
        remaining: ""
      }
    },
    {
      input: ".hoge",
      expected: {
        ast: {
          type: "Selector",
          value: ".hoge",
        },
        remaining: ""
      }
    },
    {
      input: "hoge::hover",
      expected: {
        ast: {
          type: "Selector",
          value: "hoge::hover",
        },
        remaining: ""
      }
    },
    {
      input: "hoge::nth-child(1)",
      expected: {
        ast: {
          type: "Selector",
          value: "hoge::nth-child(1)",
        },
        remaining: ""
      }
    },
    {
      input: `a[title] {`,
      expected: {
        ast: {
          type: "Selector",
          value: "a[title]",
        },
        remaining: " {"
      }
    },
    {
      input: `a[href="https://example.org"] {`,
      expected: {
        ast: {
          type: "Selector",
          value: `a[href="https://example.org"]`,
        },
        remaining: " {"
      }
    },
    {
      input: `a[href*="example"] {`,
      expected: {
        ast: {
          type: "Selector",
          value: `a[href*="example"]`,
        },
        remaining: " {"
      }
    },
    {
      input: `a[href$=".org"] {`,
      expected: {
        ast: {
          type: "Selector",
          value: `a[href$=".org"]`,
        },
        remaining: " {"
      }
    },
    {
      input: `a[class~="logo"] {`,
      expected: {
        ast: {
          type: "Selector",
          value: `a[class~="logo"]`,
        },
        remaining: " {"
      }
    }
  ]

  tests.forEach(({ input, expected }) => {
    it(`should be parsed. ${input}`, () => {
      const actual = SelectorParser.parse(input);
      expect(actual).toEqual(expected);
    });
  })
});

describe("BlockParser", () => {
  const tests = [
    {
      input: "hoge { fuga: foo; }",
      expected: {
        remaining: "hoge { fuga: foo; }",
      }
    },
    {
      input: "{ fuga: foo; } hoge",
      expected: {
        ast: {
          type: "Block",
          body: [
            {
              type: "LocalStyle",
              prop: {
                type: "Identifier",
                name: "fuga"
              },
              values: {
                type: "Identifiers",
                values: [
                  { type: "Identifier", name: "foo" }
                ]
              }
            },
          ]
        },
        remaining: " hoge",
      }
    },
    {
      input: "{ fuga: foo;",
      expected: {
        remaining: "{ fuga: foo;",
      }
    },
    {
      input: "{}",
      expected: {
        ast: {
          type: "Block",
          body: []
        },
        remaining: "",
      }
    }
  ]

  tests.forEach(({ input, expected }) => {
    it("should be parsed. ", () => {
      const actual = BlockParser.parse(input);
      expect(actual).toEqual(expected);
    });
  })
});

describe("NestedStyleParser", () => {
  const tests = [
    {
      input: "hoge { fuga: foo; }",
      expected: {
        ast: {
          type: "NestedStyle",
          selector: {
            type: "Selector",
            value: "hoge"
          },
          block: {
            type: "Block",
            body: [
              {
                type: "LocalStyle",
                prop: {
                  type: "Identifier",
                  name: "fuga"
                },
                values: {
                  type: "Identifiers",
                  values: [
                    { type: "Identifier", name: "foo" }
                  ]
                }
              }
            ]
          }
        },
        remaining: "",
      }
    },
    {
      // multiple nested style.
      input: `
hoge {
  fuga: foo;

  foo {
    bar: piyo;
  }
}
`.trim(),
      expected: {
        ast: {
          type: "NestedStyle",
          selector: {
            type: "Selector",
            value: "hoge"
          },
          block: {
            type: "Block",
            body: [
              {
                type: "LocalStyle",
                prop: {
                  type: "Identifier",
                  name: "fuga"
                },
                values: {
                  type: "Identifiers",
                  values: [
                    { type: "Identifier", name: "foo" },
                  ]
                }
              },
              {
                type: "NestedStyle",
                selector: {
                  type: "Selector",
                  value: "foo"
                },
                block: {
                  type: "Block",
                  body: [
                    {
                      type: "LocalStyle",
                      prop: {
                        type: "Identifier",
                        name: "bar"
                      },
                      values: {
                        type: "Identifiers",
                        values: [
                          { type: "Identifier", name: "piyo" }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        remaining: "",
      }
    }
  ]

  tests.forEach(({ input, expected }) => {
    it("should be parsed. ", () => {
      const actual = NestedStyleParser.parse(input);
      expect(actual).toEqual(expected);
    });
  })
});
