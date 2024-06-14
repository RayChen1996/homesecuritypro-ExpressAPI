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
      description: "Home Security Pro 的 API 文件",
    },
    tags: [
      { name: "User", description: "使用者相關的端點" },
      { name: "Symptom", description: "症狀相關的端點" },
    ],
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
app.get("/member", async (req, res) => {
  const user = {
    a: 1,
  };
  res.json(user);
});

// 使用者路由
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
    return res.status(401).send("無效的電子郵件或密碼");
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token });
});

app.post("/check", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("無效的電子郵件或密碼");
  } else {
    return res.status(200).send({ message: "使用者已存在" });
  }
});

app.post("/forgot-password", async (req, res) => {
  // 在這裡實現忘記密碼的邏輯
  res.send("忘記密碼端點");
});

// 新增症狀
app.post("/newSymptoms", async (req, res) => {
  try {
    const { label, description } = req.body;
    const symptom = await prisma.houseSymptoms.create({
      data: { label, description },
    });
    return res.status(200).send({ message: "新增成功", symptom });
  } catch (error) {
    return res.status(500).send({ message: "新增失敗", error });
  }
});

// 獲取所有症狀
app.get("/symptoms", async (req, res) => {
  try {
    const symptoms = await prisma.houseSymptoms.findMany();
    res.json(symptoms);
  } catch (error) {
    res.status(500).send({ message: "獲取失敗", error });
  }
});

// 獲取單個症狀
app.get("/symptoms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const symptom = await prisma.houseSymptoms.findUnique({
      where: { id },
    });
    if (!symptom) {
      return res.status(404).send({ message: "症狀未找到" });
    }
    res.json(symptom);
  } catch (error) {
    res.status(500).send({ message: "獲取失敗", error });
  }
});

// 更新症狀
app.put("/symptoms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { label, description } = req.body;
    const symptom = await prisma.houseSymptoms.update({
      where: { id },
      data: { label, description },
    });
    res.json(symptom);
  } catch (error) {
    res.status(500).send({ message: "更新失敗", error });
  }
});

// 刪除症狀
app.delete("/symptoms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.houseSymptoms.delete({
      where: { id },
    });
    res.send({ message: "刪除成功" });
  } catch (error) {
    res.status(500).send({ message: "刪除失敗", error });
  }
});

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`服務正在執行於端口 ${PORT}`);
});
