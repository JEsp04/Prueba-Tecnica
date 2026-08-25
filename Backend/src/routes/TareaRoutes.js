import {Router} from 'express';
import {getTareas, postTarea, patchTarea, deleteTarea} from '../controllers/TareaController.js';


const router = Router();

router.get("/tasks", getTareas);
router.post("/tasks", postTarea);
router.patch("/tasks/:id/toggle", patchTarea);
router.delete("/tasks/:id", deleteTarea);

export default router;