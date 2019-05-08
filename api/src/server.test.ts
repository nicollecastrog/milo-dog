import startServer from "./server";

describe("server", () => {
  it("starts server", () => {
    expect(async () => {
      const startedServer = await startServer();
      startedServer.close();
    }).not.toThrow();
  });
});
