import express from "express";
import next from "next";
import api from "./api/api";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();
	server.use("/api", api);
	server.all("*", (req: express.Request, res: express.Response) => handle(req, res));
	const port = process.env.PORT || 8080;
	server.listen(port, () => {
		console.log("Server is running on port 3000");
	});
}).catch((err: Error) => {
	console.error(err);
	process.exit(1);
});
