// private vs public routes separated.

const router = Router();

router.get("/alumnos", getAllAlumnos);
router.post("/alumnos", createUser);

router.get("/alumnos", authMiddleware, uploadFIle, getAllAlumnos);

// separate things

// naming: index.routes
// alumnos.controllers.
// middleware: handleErrors.
