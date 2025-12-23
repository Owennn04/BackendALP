import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { AuthController } from "../controllers/auth-controller";
import { FinanceController } from "../controllers/finance-controller";
import { TodoController } from "../controllers/todo-controller";
import { AlarmController } from "../controllers/alarm-controller";
import { EventController } from "../controllers/event-controller";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// Auth Logout
apiRouter.delete('/api/users/logout', AuthController.logout);

// Finance Routes
apiRouter.post('/api/finance', FinanceController.create);
apiRouter.get('/api/finance', FinanceController.list);

// Todo Routes
apiRouter.post('/api/todos', TodoController.create);
apiRouter.get('/api/todos', TodoController.list);
apiRouter.patch('/api/todos/:id/toggle', TodoController.toggle);
apiRouter.delete('/api/todos/:id', TodoController.remove);

// Alarm Routes
apiRouter.post('/api/alarms', AlarmController.create);
apiRouter.get('/api/alarms', AlarmController.list);
apiRouter.patch('/api/alarms/:id/toggle', AlarmController.toggle); // Body: { isActive: boolean }
apiRouter.delete('/api/alarms/:id', AlarmController.remove);

// Event Routes
apiRouter.get("/api/event", EventController.getAllEvents)
apiRouter.get("/api/event/:event_id", EventController.getEvent)
apiRouter.post("/api/event", EventController.createEvent)
apiRouter.put("/api/event/:event_id", EventController.updateEvent)
apiRouter.delete("/api/event/:event_id", EventController.deleteEvent)