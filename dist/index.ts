// import express from "express";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import swaggerJsDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import dotenv from "dotenv";

import * as express from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as swaggerJsDoc from "swagger-jsdoc";

import * as swaggerUi from "swagger-ui-express";
import * as dotenv from "dotenv";

// 加載 .env 文件中的環境變數
dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "homesecuritypro-ExpressAPI",
      version: "1.0.0",
      description: "API documentation for Home Security Pro",
    },
  },
  apis: ["./src/index.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * @swagger
 * /member:
 *   get:
 *     summary: Get member details
 *     responses:
 *       200:
 *         description: Member details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 a:
 *                   type: number
 *                   description: Example property
 */
app.get("/member", async (req, res) => {
  const user = {
    a: 1,
  };
  res.json(user);
});
// User routes
app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });
  res.json(user);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid email or password");
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token });
});

app.post("/forgot-password", async (req, res) => {
  // Implement forgot password logic here
  res.send("Forgot password endpoint");
});

// Company routes
// app.get("/companies", async (req, res) => {
//   const companies = await prisma.company.findMany();
//   res.json(companies);
// });

// Swagger documentation for the routes
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Forgot password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Forgot password endpoint
 */
/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     responses:
 *       200:
 *         description: List of companies
 */

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
