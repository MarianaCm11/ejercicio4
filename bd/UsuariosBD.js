const ConectarBD=require("./ConectarBD");

class UsuarioBD extends ConectarBD{
 constructor(){
    super();
 } 
    async nuevoUsuario(usuario){
    const sql="INSERT INTO usuarios values(null,'"+usuario.nombre+"','"+usuario.celular+"','"+usuario.correo+"');";
        try {
        await this.conectarMySql();
        this.conexion.execute(sql);
        console.log("New USU");
        await this.cerrarConexion();
        } catch (error) {
            console.error("Error al agregar usuario" + error);
            console.error(sql);
        }
    }
    async mostrarUsuarios() {
        const sql="SELECT * FROM usuarios;";
        try {
            await this.conectarMySql();
            const [usuariosMySql]= await this.conexion.query(sql);
            await this.cerrarConexion();
            console.log("Los datos se obtuvieron correctamente");
            return(usuariosMySql);
        } catch (error) {
            console.error("Error al obtener los datos "+ error);
            console.error(sql);
        }
    }

    async usuarioID(id) {
        const sql="SELECT * FROM usuarios WHERE id="+id+";";
        try {
            await this.conectarMySql();
            const [[usuario]]=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Consulta correcta por id :D");
            return usuario;
        } catch (error) {
            console.error("Error al consultar por id "+error);
            console.error(sql);
            
        }
    }

    async editarUsuario(usuario){
        const sql="UPDATE usuarios set nombre='"+usuario.nombre+"','"+usuario.celular+"','"+usuario.correo+"';";
        const sql2=`UPDATE usuarios set 
        nombre='${usuario.nombre}',
        celular='${usuario.celular}',
        correo='${usuario.correo}' 
        WHERE id='${usuario.id}' ;`;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql2);
            await this.cerrarConexion();
            console.log("Actualización correcta");
        } catch (error) {
            console.error("Error al editar el usuario" + error);
            console.error(sql2);
        }
    }

    async borrarUsuario(id){
        const sql="DELETE FROM usuarios WHERE id="+id+";";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuario borrado exitosamente");
        } catch (error) {
            console.error("Fallo al borrar el usuario" + error);
            console.error(sql);
        }
    }

}

module.exports=UsuarioBD;

/*async function prueba(){
    var u= new UsuarioBD();
    await u.nuevoUsuario();
    }
  prueba();*/