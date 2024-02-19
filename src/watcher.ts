import { WebSocketServer } from "ws";
import chokidar from "chokidar" ;

const wss = new WebSocketServer({ port: 3001 });
const watchCallbacks: (() => void)[] = [];

chokidar.watch("./public").on("all", (event: string) => {
  if (event === "change") {
    watchCallbacks.forEach((cb) => cb());
  }
});

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  
  ws.on("close", function close() {
    const index = watchCallbacks.findIndex(onChange);
    watchCallbacks.splice(index, 1);
  });

  function onChange() {
    ws.send("refresh");
  }

  watchCallbacks.push(onChange);
});
