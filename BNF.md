```
Identifier ::= /[a-zA-Z0-9]+/

StyleSheet ::= [LocalStyle | NestedStyle | KeyframeStyles | MediaStyles]*
Block ::= "{" Any* "}"
CommaSeparated ::= Identifier | Identifier "," CommaSeparated
Any ::= [LocalStyle | NestedStyle]
Value ::= /[a-zA-Z0-9\-().%]+/
Values ::= Value | Value Values
Style ::= Identifier ":" Values
LocalStyle ::= Style ";"

Selector ::= /^([a-zA-Z0-9_()+>| ,.#~=^$\[\]"'*:/\-]+)/
NestedStyle ::= Selector Block
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
