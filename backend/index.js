import path from 'path';
import { fileURLToPath } from 'url';
import connectToMongo from './db.js'; // Ensure this is the correct path
import express from 'express';
import cors from 'cors';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

connectToMongo(); // calling the db.js

const app = express(); // creating a variable to use express
const port = 5000; // giving a port number to work on

app.use(cors());
// to use req.body we use this middleware
app.use(express.json());

// Available Routes
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.use(express.static(path.join(_dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, '../build/index.html'));
});

// start a server that listens on a specific port, and then logs a message indicating the server is ready to accept connections on that port.
app.listen(port, () => {
  console.log(`iNotebook Backend Started Listening on port ${port}`);
});
