const ruta =require("express").Router(); // se requiere express pero .Router solo se manda llamar esta de todas sus funciones
const UsuarioClase=require("../clases/UsuarioClase");
const UsuarioBD=require("../bd/UsuariosBD");

ruta.get("/",async(req,res)=>{
    //var usuario1= new UsuarioClase();
    const usuariobd=new UsuarioBD();
    const usuariosMySql= await usuariobd.mostrarUsuarios();
    //console.log(usuariosMySql);
    var usuariosCorrectos=[];
    usuariosMySql.forEach(usuario => {
        var usuario1 = new UsuarioClase(usuario);
        if (usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined) {
            usuariosCorrectos.push(usuario);
        }
    });
    console.log(usuariosCorrectos);  
    res.render("mostrarUsuarios",{usuariosCorrectos});
});



ruta.post("/agregarUsuario",(req,res)=>{
    //console.log(req.body);
    var usuario1=new UsuarioClase(req.body);
    //console.log(usuario1);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd=new UsuarioBD();
        usuariobd.nuevoUsuario(usuario1.mostrarDatos)
        //console.log(usuario1);
        res.render("inicio",usuario1.mostrarDatos);
    }else{
      res.render("error");
    }
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.get("/editarUsuario/:id",async(req,res)=>{ // con : se indica que hay una variable 
    // res.send("Estas en editar "+req.params.id); // params ees para hipervinculo y body para formulario

   try {
    const usuariobd= new UsuarioBD();
    const usuario= await usuariobd.usuarioID(req.params.id);
    res.render("editarUsuario",usuario);
   } catch (error) {
    
   }
    // res.end();
    // res.render("editarUsuario")
});

ruta.post("/editarUsuario", async(req,res)=>{
    try {
        const usuariobd= new UsuarioBD();
        await usuariobd.editarUsuario(req.body);
        console.log("Usuario editado con exito");
        res.redirect("/");
    } catch (error) {
        console.log("Error al editar al usuario "+error);

    }
});

ruta.get("/borrarUsuario/:id",async(req,res)=>{
    try {
        const usuariobd=new UsuarioBD();
        await usuariobd.borrarUsuario(req.params.id);
        res.redirect("/");
    } catch (error) {
        console.log("Algo fallo al borrar"+error);
    }
});

module.exports=ruta; // para exportar una variable