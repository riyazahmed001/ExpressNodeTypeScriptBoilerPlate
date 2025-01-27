const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();

// Multer configuration to store the file temporarily in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve the client files (HTML form) from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Ensure the uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  // Define the path to store the file
  const filePath = path.join(
    uploadsDir,
    Date.now() + path.extname(req.file.originalname)
  );

  // Write the file using fs
  fs.writeFile(filePath, req.file.buffer, (err) => {
    if (err) {
      console.error("Error saving the file:", err);
      return res.status(500).send("Failed to save file");
    }

    res.send("File uploaded and saved successfully!");
  });
});

app.post("/upload-chunk", upload.single("chunk"), (req, res) => {
  const { offset, fileName } = req.body;
  const filePath = path.join(uploadsDir, fileName);

  // Append the chunk to the file
  fs.appendFile(filePath, req.file.buffer, (err) => {
    if (err) {
      return res.status(500).send("Failed to write chunk");
    }
    res.status(200).send("Chunk uploaded successfully");
  });
});

app.get("/video", (req, res) => {
  const videoPath = path.join(__dirname, "public/sample.mp4"); // Path to your sample MP4 video
  const videoSize = fs.statSync(videoPath).size;

  // Parse the Range header from the request (e.g., "bytes=0-")
  const range = req.headers.range;

  if (!range) {
    return res.status(416).send("Requires Range header");
  }

  const CHUNK_SIZE = 10 ** 6; // 1MB per chunk
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // Send the headers
  res.writeHead(206, headers);

  // Create a readable stream from the video file starting from the requested byte range
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Pipe the stream to the response
  videoStream.pipe(res);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
