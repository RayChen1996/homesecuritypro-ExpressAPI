"use strict";
// import express from "express";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import swaggerJsDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import dotenv from "dotenv";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const swaggerJsDoc = __importStar(require("swagger-jsdoc"));
const swaggerUi = __importStar(require("swagger-ui-express"));
const dotenv = __importStar(require("dotenv"));
// 加載 .env 文件中的環境變數
dotenv.config();
const prisma = new client_1.PrismaClient();
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
app.get("/member", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        a: 1,
    };
    res.json(user);
}));
// User routes
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const hashedPassword = yield bcrypt.hash(password, 10);
    const user = yield prisma.user.create({
        data: { email, password: hashedPassword, name },
    });
    res.json(user);
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user || !(yield bcrypt.compare(password, user.password))) {
        return res.status(401).send("Invalid email or password");
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token });
}));
app.post("/forgot-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement forgot password logic here
    res.send("Forgot password endpoint");
}));
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
