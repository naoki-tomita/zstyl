import { hashString } from "../hash";

describe("hash", () => {
  it("should calc hash", () => {
    const text = `
*[data-zstyl='id'] { display: flex; justify-content: center; color: green; }
@media (max-width: 600px) {
*[data-zstyl='id'] { display: inline-flex; }
*[data-zstyl='id']:hover { color: black; }
}
*[data-zstyl='id']:hover { color: red; }
*[data-zstyl='id']:active { color: blue; }
*[data-zstyl='id'] .hoge { width: 100%; }
    `.trim();
    const actual = hashString(text);
    expect(actual).toBe("bJIaaS");
  });
});
