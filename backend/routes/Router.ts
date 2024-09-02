import express, { Router, Request, Response } from "express";

const router = Router();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/tasks", require("../routes/TaskRouter"));

router.get("/", (req: Request, res: Response) => {
  res.send("API WORKING JESUS EH BOM");
});

export default router;
