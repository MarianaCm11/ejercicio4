const express=require("express");
const path=require("path");
const usuariosRutas=require("./routes/usuariosRutas");

const app=express();
app.use("/",express.static(path.join(__dirname,"web")));
app.set("view engine", "ejs"); //esta no puede ir despues de app.use("/",usuariosRutas);
app.use(express.urlencoded({extended:true})); //ni esta no puede ir despues de app.use("/",usuariosRutas);, es para los formularios
app.use("/",usuariosRutas);

const port=process.env.PORT || 3000; 
// para que nos entrege el sistema operativo
app.listen(port,()=>{
    console.log("Servidos en http://127.0.0.1:"+port);
});