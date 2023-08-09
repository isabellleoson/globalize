import mongoose from "mongoose";
import express from "express";
import multer from "multer";
const path = require("path");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
});

mongoose.connect("mongodb://127.0.0.1:27017/webshop/");

const WebshopSchema = new mongoose.Schema({
    id: Number,
    productName: String,
    price: Number,
    description: String,
    image: String,
});

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const Product = mongoose.model("product", WebshopSchema);
const Admin = mongoose.model("admins", UserSchema);

const storage = multer.diskStorage({
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

const upload = multer({ storage: storage });

app.post("/admin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

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
});

app.get("/api", async (req, res) => {
    try {
        let result = await Product.find();

        if (result.length === 0) {
            return res.status(404).json({ error: "Inga produkter hittades" });
        }

        result = result.map((product) => {
            if (typeof product.image === "string") {
                product.image = `http://localhost:8080/${product.image}`;
            }
            return product;
        });

        res.status(200).json(result);
    } catch (error) {
        console.error("Error:", error);
        console.log("oh nej!");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/product", upload.single("image"), async (req, res) => {
    try {
        const { _id, productName, price, description } = req.body;

        let image = "";

        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        } else {
            res.status(500).send("Error");
        }

        const newProduct = new Product({
            _id,
            productName,
            price,
            description,
            image,
        });
        await newProduct.save();
        res.status(201).send({ success: "Produkt har lagts till" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error ny produkt");
    }
});

app.delete("/product/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deletedProduct = await Product.deleteOne({ _id: id });

        if (deletedProduct.deletedCount === 0) {
            return res.status(404).json({
                error: "Produkten hittades inte och kunde därför inte tas bort",
            });
        }

        res.status(200).json({ success: "Produkten raderad" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Gick inte att ta bort produkten" });
    }
});

// app.use(express.static(path.join(path.resolve(), "public")));

// const port = process.env.PORT || 8080;

// app.listen(port, () => {
//     console.log(`Redo på http://localhost:${port}/`);
// });

app.listen(8080, () => {
    console.log("Lyssnar på port 8080");
});

// "build-frontend": "npm run --prefix ../frontend build && rm -Rf public && cp -R ../frontend/build public",
//         "build": "npx tsc",
//         "dev": "concurrently \"nodemon index.js\" \"npx tsc --watch\"",
//         "start": "node index.js",
//         "test": "echo \"Error: no test specified\" && exit 1"
