"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var client_1 = require("@prisma/client");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var dotenv = require("dotenv");
// 加載 .env 文件中的環境變數
dotenv.config();
var prisma = new client_1.PrismaClient();
var app = express();
app.use(express.json());
var swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "homesecuritypro-ExpressAPI",
            version: "1.0.0",
            description: "Home Security Pro 的 API 文件",
        },
        tags: [
            { name: "User", description: "使用者相關的端點" },
            { name: "Symptom", description: "症狀相關的端點" },
        ],
    },
    apis: ["./src/index.ts"],
};
var swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
var JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
/**
 * @swagger
 * /member:
 *   get:
 *     summary: 獲取會員詳細信息
 *     tags: [Symptom]
 *     responses:
 *       200:
 *         description: 成功獲取會員詳細信息
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 a:
 *                   type: number
 *                   description: 示例屬性
 */
app.get("/member", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        user = {
            a: 1,
        };
        res.json(user);
        return [2 /*return*/];
    });
}); });
// 使用者路由
app.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, name, hashedPassword, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, name = _a.name;
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: { email: email, password: hashedPassword, name: name },
                    })];
            case 2:
                user = _b.sent();
                res.json(user);
                return [2 /*return*/];
        }
    });
}); });
app.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, token;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
            case 1:
                user = _c.sent();
                _b = !user;
                if (_b) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                _b = !(_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    return [2 /*return*/, res.status(401).send("無效的電子郵件或密碼")];
                }
                token = jwt.sign({ userId: user.id }, JWT_SECRET);
                res.json({ token: token });
                return [2 /*return*/];
        }
    });
}); });
app.post("/check", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
            case 1:
                user = _c.sent();
                _b = !user;
                if (_b) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                _b = !(_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    return [2 /*return*/, res.status(401).send("無效的電子郵件或密碼")];
                }
                else {
                    return [2 /*return*/, res.status(200).send({ message: "使用者已存在" })];
                }
                return [2 /*return*/];
        }
    });
}); });
app.post("/forgot-password", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // 在這裡實現忘記密碼的邏輯
        res.send("忘記密碼端點");
        return [2 /*return*/];
    });
}); });
// 新增症狀
app.post("/newSymptoms", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, label, description, symptom, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, label = _a.label, description = _a.description;
                return [4 /*yield*/, prisma.houseSymptoms.create({
                        data: { label: label, description: description },
                    })];
            case 1:
                symptom = _b.sent();
                return [2 /*return*/, res.status(200).send({ message: "新增成功", symptom: symptom })];
            case 2:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).send({ message: "新增失敗", error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); });
// 獲取所有症狀
app.get("/symptoms", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var symptoms, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.houseSymptoms.findMany()];
            case 1:
                symptoms = _a.sent();
                res.json(symptoms);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).send({ message: "獲取失敗", error: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// 獲取單個症狀
app.get("/symptoms/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, symptom, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma.houseSymptoms.findUnique({
                        where: { id: id },
                    })];
            case 1:
                symptom = _a.sent();
                if (!symptom) {
                    return [2 /*return*/, res.status(404).send({ message: "症狀未找到" })];
                }
                res.json(symptom);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).send({ message: "獲取失敗", error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// 更新症狀
app.put("/symptoms/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, label, description, symptom, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, label = _a.label, description = _a.description;
                return [4 /*yield*/, prisma.houseSymptoms.update({
                        where: { id: id },
                        data: { label: label, description: description },
                    })];
            case 1:
                symptom = _b.sent();
                res.json(symptom);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                res.status(500).send({ message: "更新失敗", error: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// 刪除症狀
app.delete("/symptoms/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma.houseSymptoms.delete({
                        where: { id: id },
                    })];
            case 1:
                _a.sent();
                res.send({ message: "刪除成功" });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).send({ message: "刪除失敗", error: error_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// 公司路由
// app.get("/companies", async (req, res) => {
//   const companies = await prisma.company.findMany();
//   res.json(companies);
// });
// Swagger 文件
/**
 * @swagger
 * /newSymptoms:
 *   post:
 *     summary: 新增症狀
 *     tags: [Symptom]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *                 description: 症狀標籤
 *               description:
 *                 type: string
 *                 description: 症狀描述
 *     responses:
 *       200:
 *         description: 症狀新增成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 symptom:
 *                   $ref: '#/components/schemas/Symptom'
 *       500:
 *         description: 症狀新增失敗
 */
/**
 * @swagger
 * /symptoms:
 *   get:
 *     summary: 獲取所有症狀
 *     tags: [Symptom]
 *     responses:
 *       200:
 *         description: 成功獲取症狀列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Symptom'
 *       500:
 *         description: 獲取症狀列表失敗
 */
/**
 * @swagger
 * /symptoms/{id}:
 *   get:
 *     summary: 獲取單個症狀
 *     tags: [Symptom]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 症狀ID
 *     responses:
 *       200:
 *         description: 成功獲取症狀
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Symptom'
 *       404:
 *         description: 症狀未找到
 *       500:
 *         description: 獲取症狀失敗
 */
/**
 * @swagger
 * /symptoms/{id}:
 *   put:
 *     summary: 更新症狀
 *     tags: [Symptom]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 症狀ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *                 description: 症狀標籤
 *               description:
 *                 type: string
 *                 description: 症狀描述
 *     responses:
 *       200:
 *         description: 症狀更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Symptom'
 *       500:
 *         description: 症狀更新失敗
 */
/**
 * @swagger
 * /symptoms/{id}:
 *   delete:
 *     summary: 刪除症狀
 *     tags: [Symptom]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 症狀ID
 *     responses:
 *       200:
 *         description: 症狀刪除成功
 *       500:
 *         description: 症狀刪除失敗
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Symptom:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: 症狀ID
 *         label:
 *           type: string
 *           description: 症狀標籤
 *         description:
 *           type: string
 *           description: 症狀描述
 */
/**
 * @swagger
 * /newSymptoms:
 *   post:
 *     summary: 新增症狀
 *     tags: [Symptom]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: 成功新增症狀
 */
/**
 * @swagger
 * /check:
 *   post:
 *     summary: 檢查使用者
 *     tags: [User]
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
 *         description: 使用者檢查成功
 */
/**
 * @swagger
 * /register:
 *   post:
 *     summary: 註冊新使用者
 *     tags: [User]
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
 *         description: 使用者註冊成功
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: 使用者登入
 *     tags: [User]
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
 *         description: 使用者登入成功
 */
/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: 忘記密碼
 *     tags: [User]
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
 *         description: 忘記密碼端點
 */
/**
 * @swagger
 * /companies:
 *   get:
 *     summary: 獲取所有公司
 *     responses:
 *       200:
 *         description: 公司列表
 */
var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
    console.log("\u670D\u52D9\u6B63\u5728\u57F7\u884C\u65BC\u7AEF\u53E3 ".concat(PORT));
});
