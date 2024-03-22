const { personaService } = require("../services");
const router = require("express").Router();

router.get("/get/:id", (req, res) => {
    personaService.read(req, res);
});

router.get("/get", (req, res) => {
    personaService.read(req, res);
});

router.post("/post", (req, res) => {
    personaService.create(req, res);
});

router.put("/put/:id", (req, res) => {
    personaService.update(req, res);
});

router.delete("/delete/:id", (req, res) => {
    personaService.delete(req, res);
});

router.delete("/delete", (req, res) => {
    personaService.delete(req, res);
});

module.exports = router;