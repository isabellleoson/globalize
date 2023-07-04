"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const path = require("path");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path.join(__dirname, "public")));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use((0, cors_1.default)());
mongoose_1.default.connect("mongodb://127.0.0.1:27017/webshop");
const WebshopSchema = new mongoose_1.default.Schema({
    id: Number,
    productName: String,
    price: Number,
    description: String,
    image: String,
});
const UserSchema = new mongoose_1.default.Schema({
    username: String,
    email: String,
    password: String,
});
const Product = mongoose_1.default.model("product", WebshopSchema);
const Admin = mongoose_1.default.model("admins", UserSchema);
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    //funktion från Chat GTP för att undvika att inte råka ladda upp två olika bilder med samma namn.
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.post("/admin", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const admin = yield Admin.findOne({ email });
            if (email === "") {
                res.status(401).json({ error: "Email fattas" });
            } else if (!admin) {
                res.status(404).json({
                    error: "Du saknar befogenhet för att logga in här",
                });
            } else if (password === "") {
                res.status(401).json({ error: "lösenord fattas" });
            } else if (admin.password !== password) {
                res.status(401).json({ error: "fel lösenord" });
            } else {
                res.status(200).json(admin);
            }
        } catch (error) {
            res.status(500).json({ error: "Ett fel uppstod, försök igen" });
        }
    })
);
app.get("/api", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        let result = yield Product.find();
        result = result.map((product) => {
            if (typeof product.image === "string") {
                product.image = `http://localhost:8080/${product.image}`;
            }
            return product;
        });
        res.status(200).send(result);
    })
);
app.post("/product", upload.single("image"), (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id, productName, price, description } = req.body;
            let image = "";
            if (req.file) {
                image = `/uploads/${req.file.filename}`;
            }
            const newProduct = new Product({
                _id,
                productName,
                price,
                description,
                image,
            });
            yield newProduct.save();
            res.status(201).send({ success: "Produkt har lagts till" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Error ny produkt");
        }
    })
);
app.delete("/product/:id", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield Product.deleteOne({ _id: id });
            res.status(200).send({ success: "Produkt raderad" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({ error: "Gick inte att ta bort produkten" });
        }
    })
);
app.listen(8080, () => {
    console.log("Lyssnar på port 8080");
});
