import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Database Setup
  const db = new Database("portfolio.db");
  db.pragma("journal_mode = WAL");

  // Initialize Tables
  db.exec(`
    DROP TABLE IF EXISTS experiences;
    DROP TABLE IF EXISTS skills;
    DROP TABLE IF EXISTS projects;

    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      period TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      tags TEXT NOT NULL,
      link TEXT
    );
  `);

  // Seed Data if empty
  const experienceCount = db.prepare("SELECT count(*) as count FROM experiences").get() as { count: number };
  if (experienceCount.count === 0) {
    db.prepare("INSERT INTO experiences (title, company, period, description, image) VALUES (?, ?, ?, ?, ?)").run(
      "Basketball Competition Participant",
      "SMAN Puri 1 Mojokerto",
      "2025",
      "Actively participated in regional basketball competitions, demonstrating strong teamwork, physical endurance, and sportsmanship. Represented the school with pride and dedication.",
      "/basket_exp.jpeg"
    );

    const skills = [
      { name: "React", category: "Frontend" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Framer Motion", category: "Animation" },
      { name: "TypeScript", category: "Language" },
      { name: "UI/UX Design", category: "Design" },
      { name: "Teamwork", category: "Soft Skill" },
      { name: "Communication", category: "Soft Skill" },
    ];
    const insertSkill = db.prepare("INSERT INTO skills (name, category) VALUES (?, ?)");
    skills.forEach(s => insertSkill.run(s.name, s.category));

    const projects = [
      {
        title: "Coquette Aesthetic Portfolio",
        description: "A personal branding website with a soft feminine aesthetic.",
        image: "/project_portfolio.jpg",
        tags: "React, Tailwind, SQLite",
        link: "#"
      },
      {
        title: "DIY Bracelets & Phone Straps",
        description: "A creative business venture selling handmade aesthetic accessories.",
        image: "/project_diy.jpeg",
        tags: "Creative, Business, Design",
        link: "#"
      },
      {
        title: "Basketball Team Dashboard",
        description: "A tracking system for school basketball team performance.",
        image: "/project_basketball.jpeg",
        tags: "React, Framer Motion",
        link: "#"
      }
    ];
    const insertProject = db.prepare("INSERT INTO projects (title, description, image, tags, link) VALUES (?, ?, ?, ?, ?)");
    projects.forEach(p => insertProject.run(p.title, p.description, p.image, p.tags, p.link));
  }

  // API Routes
  app.get("/api/experiences", (req, res) => {
    const data = db.prepare("SELECT * FROM experiences ORDER BY id DESC").all();
    res.json(data);
  });

  app.get("/api/skills", (req, res) => {
    const data = db.prepare("SELECT * FROM skills").all();
    res.json(data);
  });

  app.get("/api/projects", (req, res) => {
    const data = db.prepare("SELECT * FROM projects").all();
    // Parse tags back to array
    const parsedData = data.map((p: any) => ({
      ...p,
      tags: p.tags.split(",").map((t: string) => t.trim())
    }));
    res.json(parsedData);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
