
import { Hono } from 'hono';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { getAllLocation} from '../controllers/locationController';

const router = new Hono()

// router.get('/combobox', AuthMiddleware, (c) => getCombobox(c));
router.get('/', AuthMiddleware, (c) => getAllLocation(c));
// router.get('/:id', AuthMiddleware, (c) =>showJenisById(c));
// router.post('/', AuthMiddleware, (c) => createJenis(c));
// router.post('/:id', AuthMiddleware, (c) => updateJenis(c));
// router.delete('/:id', AuthMiddleware, (c) => deleteJenis(c));

export const locationRoutes = router;
