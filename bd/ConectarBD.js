require('dotenv').config();
class ConectarBD{
    constructor(){
        this.conexion=null;
        this.mysql=require("mysql2/promise");
    }
    async conectarMySql(){
        try{
            this.conexion=await this.mysql.createConnection({
                host:process.env.HOSTMYSQL,
                user:process.env.USERMYSQL,
                password:process.env.PASSWORDMYSQL,
                database:process.env.DATABASEMYSQL,
                port:process.env.PORTMYSQL
            });
            console.log("Conectado Exitosamente :D");
        }catch(error){
            console.log("Error al conectar con MySql" + error);
        }
    }
    async cerrarConexion(){
        try {
        await this.conexion.end();
        console.log("Conexion Finalizada :]");
        } catch (error) {
        console.log("Error al desconectar de MySql"+error);
        }
        
    }
}
/*async function principial(){
var conectarBD=new ConectarBD();
await conectarBD.conectarMySql();
await conectarBD.cerrarConexion();
}
principial();*/

module.exports=ConectarBD;