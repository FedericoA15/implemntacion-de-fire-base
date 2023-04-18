const express = require("express");
const app = express();
const { initializeApp } = require("firebase/app");

const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBBM3eNpLREVGTQVYnR1wRk8IsOi1t3O8k",
  authDomain: "pruebadedatabase.firebaseapp.com",
  projectId: "pruebadedatabase",
  storageBucket: "pruebadedatabase.appspot.com",
  messagingSenderId: "413100398306",
  appId: "1:413100398306:web:1a7761e119bdff188070bb",
  measurementId: "G-70E82D24LT",
};

initializeApp(firebaseConfig);

const db = getFirestore();

app.use(express.json());

app.post("/usuarios", async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.apellido || !req.body.edad) {
      return res
        .status(400)
        .send("Campos nombre, apellido y edad son requeridos");
    }
    const { nombre, apellido, edad } = req.body;
    const user = await addDoc(collection(db, "usuarios"), {
      nombre,
      apellido,
      edad,
    });
    res.send({ id: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
});

// Obtener todos los usuarios de Firestore
app.get("/usuarios", async (req, res) => {
  try {
    const usuariosRef = collection(db, "usuarios");

    const usuariosSnap = await getDocs(usuariosRef);
    const usuarios = [];
    usuariosSnap.forEach((doc) => {
      usuarios.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.send(usuarios);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
});
// GET /usuarios/:id
app.get("/usuarios/:id", async (req, res) => {
  try {
    const id = req.params.id; // Obtén el ID del usuario desde los parámetros de la ruta

    // Obtiene una referencia al documento del usuario en Firestore usando el ID
    const usuarioDoc = await getDoc(doc(db, "usuarios", id));

    // Verifica si el documento existe
    if (usuarioDoc.exists()) {
      // Obtiene los datos del usuario del documento
      const usuario = {
        id: usuarioDoc.id,
        data: usuarioDoc.data(),
      };
      res.send(usuario);
    } else {
      res.status(404).send(`Usuario con ID ${id} no encontrado.`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
});

// PUT /usuarios/:id
app.put("/usuarios/:id", async (req, res) => {
  try {
    const id = req.params.id; // Obtén el ID del usuario desde los parámetros de la ruta
    const { nombre, apellido, edad } = req.body; // Obtén los datos del usuario desde el body de la solicitud

    // Actualiza el documento del usuario en Firestore usando el ID y los datos actualizados
    await updateDoc(doc(db, "usuarios", id), { nombre, apellido, edad });

    res.send(`Usuario con ID ${id} actualizado exitosamente.`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
});
// DELETE /usuarios/:id
// app.delete("/usuarios/:id", async (req, res) => {
//   try {
//     const id = req.params.id; // Obtén el ID del usuario desde los parámetros de la ruta

//     // Elimina el documento del usuario en Firestore usando el ID
//     await deleteDoc(doc(db, "usuarios", id));

//     res.send(`Usuario con ID ${id} eliminado exitosamente.`);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong.");
//   }
// });

// Iniciar la aplicación de Express en el puerto 3000
app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
