# zstyl

A CSS in JS framework like styled-component for zheleznaya.

## how to use

```tsx
import { h, render } from "zheleznaya";
import { styled } from "zstyl";

const Header = styled<{
  color: string;
}>`
  display: flex;
  justify-content: center;
  background: ${({ color }) => color}

  &:hover {
    background: #000;
  }

  div.inner {
    height: 200px;
  }
`;

render(
  <Header>
    <div class="inner">200px height</div>
  </Header>
);
```