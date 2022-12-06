```
IDENTIFIER ::= /[a-zA-Z0-9]+/
SPACE ::= [" " | \t | \r\n | \n]
LPAREN ::= "("
RPAREN ::= ")"

StyleSheet ::= [LocalStyle | NestedStyle | C | D]*
Block ::= "{" Any* "}"
CommaSeparated ::= IDENTIFIER | IDENTIFIER "," CommaSeparated
Any ::= [LocalStyle | NestedStyle]
Identifiers ::= IDENTIFIER | IDENTIFIER Identifiers
Style ::= IDENTIFIER ":" Identifiers
LocalStyle ::= Style ";"
NestedStyle ::= [CommaSeparated]* Block
KeyframeStyles ::= "@keyframes" IDENTIFIER Block
MediaStyles ::= "@media" "(" Style ")" Block
```


```scss
// A
color: blue;

// B
selector {
  color: black;

  inner {
    color: red;
  }
}

// C
@keyframe name {
  from {
    color: #fff;
  }

  to {
    color: #000;
  }
}

// D
@media (width: 200px) {
  selector {
    color: purple;

    inner {
      color: yellow;
    }
  }
}
```
