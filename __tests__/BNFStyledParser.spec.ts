import { BlockParser, IdentifierParser, ValuesParser, KeyframeStyleParser, LocalStyleParser, MediaStyleParser, NestedStyleParser, SelectorParser, StyleParser, StyleSheetParser, ValueParser } from "../BNFStyledParser";
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

describe("ValueParser", () => {
  const tests = [
    {
      input: "",
      expected: { remaining: "" },
    },
    {
      input: "foo",
      expected: {
        ast: { type: "Value", value: "foo" },
        remaining: ""
      },
    },
    {
      input: "foo bar",
      expected: {
        ast: { type: "Value", value: "foo" },
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
        ast: { type: "Value", value: "foo" },
        remaining: " bar "
      }
    },
    {
      input: "#ccc",
      expected: {
        ast: { type: "Value", value: "#ccc" },
        remaining: ""
      }
    },
    {
      input: "3.25em",
      expected: {
        ast: { type: "Value", value: "3.25em" },
        remaining: ""
      }
    },
    {
      input: "var(--nc-tx-1)",
      expected: {
        ast: { type: "Value", value: "var(--nc-tx-1)" },
        remaining: ""
      }
    }
  ]

  tests.forEach(({ input, expected }) => {
    it(`should be parsed. "${input}"`, () => {
      const actual = ValueParser.parse(input)
      expect(actual).toEqual(expected);
    });
  });
});

describe("ValuesParser", () => {
  const tests = [
    {
      input: "",
      expected: { remaining: "" },
    },
    {
      input: "foo",
      expected: {
        ast: {
          type: "Values",
          values: [
            { type: "Value", value: "foo" }
          ]
        },
        remaining: ""
      },
    },
    {
      input: "foo bar",
      expected: {
        ast: {
          type: "Values",
          values: [
            { type: "Value", value: "foo" },
            { type: "Value", value: "bar" }
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
          type: "Values",
          values: [
            { type: "Value", value: "foo" },
            { type: "Value", value: "bar" }
          ]
        },
        remaining: " "
      }
    },
    {
      input: " foo bar;",
      expected: {
        ast: {
          type: "Values",
          values: [
            { type: "Value", value: "foo" },
            { type: "Value", value: "bar" }
          ]
        },
        remaining: ";"
      }
    }
  ]

  tests.forEach(({ input, expected }) => {
    it(`should be parsed. "${input}"`, () => {
      const actual = ValuesParser.parse(input)
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
            type: "Values",
            values: [
              { type: "Value", value: "bar" },
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
            type: "Values",
            values: [
              { type: "Value", value: "bar" },
              { type: "Value", value: "hoge" },
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
            type: "Values",
            values: [
              { type: "Value", value: "bar" },
              { type: "Value", value: "hoge" },
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
    },
    {
      input: "&::hover",
      expected: {
        ast: {
          type: "Selector",
          value: `&::hover`,
        },
        remaining: ""
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
                type: "Values",
                values: [
                  { type: "Value", value: "foo" }
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
    it(`should be parsed.  ${input}`, () => {
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
                  type: "Values",
                  values: [
                    { type: "Value", value: "foo" }
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
                  type: "Values",
                  values: [
                    { type: "Value", value: "foo" },
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
                        type: "Values",
                        values: [
                          { type: "Value", value: "piyo" }
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

describe("MediaStyleParser", () => {
  const tests = [
    {
      input: "@media(min-width:120px){}",
      expected: {
        ast: {
          type: "Media",
          condition: {
            type: "MediaCondition",
            name: {
              type: "Identifier",
              name: "min-width"
            },
            value: {
              type: "Identifier",
              name: "120px",
            }
          },
          block: {
            type: "Block",
            body: []
          }
        },
        remaining: ""
      }
    },
    {
      input: " @media  ( min-width: 120px )  {}",
      expected: {
        ast: {
          type: "Media",
          condition: {
            type: "MediaCondition",
            name: {
              type: "Identifier",
              name: "min-width"
            },
            value: {
              type: "Identifier",
              name: "120px",
            }
          },
          block: {
            type: "Block",
            body: []
          }
        },
        remaining: ""
      }
    },
    {
      input: "@media foo {",
      expected: {
        remaining: "@media foo {"
      }
    },
    {
      input: "@media foo a",
      expected: {
        remaining: "@media foo a"
      }
    },
    {
      input: "@media (min-width: 120px hoge",
      expected: {
        remaining: "@media (min-width: 120px hoge"
      }
    },
    {
      input: "@media (",
      expected: {
        remaining: "@media ("
      }
    },
    {
      input: "@media",
      expected: {
        remaining: "@media"
      }
    }
  ]
  tests.forEach(({ input, expected }) => {
    it(`should be parse "${input}"`, () => {
      const actual = MediaStyleParser.parse(input);
      expect(actual).toEqual(expected);
    });
  });
});

describe("KeyframeStyleParser", () => {
  const tests = [
    {
      input: "@keyframes foo {}",
      expected: {
        ast: {
          type: "Keyframe",
          name: {
            type: "Identifier",
            name: "foo"
          },
          block: {
            type: "Block",
            body: []
          }
        },
        remaining: ""
      }
    },
    {
      input: " @keyframes  foo  {}",
      expected: {
        ast: {
          type: "Keyframe",
          name: {
            type: "Identifier",
            name: "foo"
          },
          block: {
            type: "Block",
            body: []
          }
        },
        remaining: ""
      }
    },
    {
      input: "@keyframes foo {",
      expected: {
        remaining: "@keyframes foo {"
      }
    },
    {
      input: "@keyframes foo a",
      expected: {
        remaining: "@keyframes foo a"
      }
    },
    {
      input: "@keyframes foo hoge",
      expected: {
        remaining: "@keyframes foo hoge"
      }
    },
    {
      input: "@keyframe",
      expected: {
        remaining: "@keyframe"
      }
    },
    {
      input: "@keyframe",
      expected: {
        remaining: "@keyframe"
      }
    },
  ]
  tests.forEach(({ input, expected }) => {
    it(`should be parse "${input}"`, () => {
      const actual = KeyframeStyleParser.parse(input);
      expect(actual).toEqual(expected);
    });
  });
});

describe("StyleSheetParser", () => {
  it("should parse stylesheet", () => {
    const style = `
display: flex;

&:hover {
  color: red;

  .inner {
    color: black;
  }
}

.wrapper {
  color: blue;

  .inner {
    color: green;
  }
}

@media (max-width: 200px) {
  display: inline-flex;

  .inner {
    color: yellow;
  }
}

@keyframes colors {
  from {
    color: yellow;
  }

  50% {
    color: black;
  }

  to {
    color: red;
  }
}
    `;
    const actual = StyleSheetParser.parse(style);
    expect(actual).toMatchSnapshot();
  });
});
