
const React = {};
import { render, h, useStore } from "zheleznaya";
import { styled } from "./index";
const Title = styled<{ color: string }>`
  display: flex;
  gap: ${16}px;
  background-color: ${({ color }) => color};

  &:hover {
    background-color: black;
  }

  .hoge {
    color: red;
  }
`;

const Heading = styled.h1`
  color: blue;
`;

const A = styled.a`
  text-shadow: 2px 2px #ccc;
`;

const App = () => {
  const store = useStore({ color: "green" });
  return (
    <div>
      <Heading>Hello</Heading>
      <Title color={store.color}>
        <div class="hoge">hoge</div>
        <div>fuga</div>
      </Title>
      <A href="/foo">hoge</A>
      <input oninput={e => store.color = (e.target as any).value} />
    </div>
  );
}

render(<App/>, document.body);
