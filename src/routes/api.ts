import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { AlarmController } from "../controllers/alarm-controller";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// Alarm Routes
apiRouter.post('/api/alarms', AlarmController.create);
apiRouter.get('/api/alarms', AlarmController.list);
apiRouter.patch('/api/alarms/:id/toggle', AlarmController.toggle); // Body: { isActive: boolean }
apiRouter.delete('/api/alarms/:id', AlarmController.remove);