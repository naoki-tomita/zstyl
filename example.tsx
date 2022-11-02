
import { render, h, useStore } from "zheleznaya";
import { styled } from ".";
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

const App = () => {
  const store = useStore({ color: "green" });
  return (
    <div>
      <Title color={store.color}>
        <div class="hoge">hoge</div>
        <div>fuga</div>
      </Title>
      <input oninput={e => store.color = (e.target as any).value} />
    </div>
  );
}

render(<App/>, document.body);
