import { Router } from "express";
import type { Model } from "mongoose";

export const createCrudRouter = (model: Model<unknown>) => {
  const router = Router();

  router.get("/", async (_req, res, next) => {
    try {
      const records = await model.find().lean();
      res.json(records);
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const record = await model.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const record = await model.findById(req.params.id).lean();

      if (!record) {
        res.status(404).json({ message: "Record not found" });
        return;
      }

      res.json(record);
    } catch (error) {
      next(error);
    }
  });

  router.patch("/:id", async (req, res, next) => {
    try {
      const record = await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!record) {
        res.status(404).json({ message: "Record not found" });
        return;
      }

      res.json(record);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const record = await model.findByIdAndDelete(req.params.id);

      if (!record) {
        res.status(404).json({ message: "Record not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
};
