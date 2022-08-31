import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { google } from "googleapis";
import { join } from "path";
import { fileURLToPath, URL } from "url";
import render from "./entry.ssr";

dotenv.config();

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_V3_API_KEY,
});

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * Create an express server
 * https://expressjs.com/
 */
const app = express();

/**
 * Serve static client build files,
 * hashed filenames, immutable cache-control
 */
app.use(
  "/build",
  express.static(join(__dirname, "..", "dist", "build"), {
    immutable: true,
    maxAge: "1y",
  })
);

/**
 * Serve static public files at the root
 */
app.use(express.static(join(__dirname, "..", "dist"), { index: false }));

/**
 * Handle CORS for development testing
 */
if (process.env.CORS_ENABLED === "yes")
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

/**
 * Youtube API handler callable from client side
 */
app.get("/youtube-search", async (req: Request, res: Response) => {
  try {
    const youtubeData = await youtube.search.list({
      part: ["snippet"],
      q: req.query.q as string,
      order: req.query.order as string,
      maxResults: 50,
    });
    res.json({
      data: {
        content: youtubeData.data.items,
      },
    });
  } catch (e) {
    res.send("An Error occured.");
  }
});
app.get("/youtube-comments", async (req: Request, res: Response) => {
  try {
    const youtubeData = await youtube.commentThreads.list({
      part: ["snippet"],
      videoId: req.query.videoId as string,
      maxResults: 100,
    });
    res.json({
      data: {
        content: youtubeData.data.items,
      },
    });
  } catch (e) {
    res.send("An Error occured.");
  }
});

/**
 * Server-Side Render Qwik application
 */
app.get("/home", async (req, res, next) => {
  try {
    // Render the Root component to a string
    const result = await render({
      stream: res,
    });

    // respond with SSR'd HTML
    if ("html" in result) {
      res.send((result as any).html);
    } else {
      res.end();
    }
  } catch (e) {
    // Error while server-side rendering
    next(e);
  }
});

/**
 * Start the express server
 */
app.listen(8080, () => {
  /* eslint-disable */
  console.log(`http://localhost:8080/`);
});
