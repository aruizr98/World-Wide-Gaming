export class Usuario{
    constructor(
        public _id:string,
        public NombreUsuario:string,
        public Nombre:string,
        public Apellidos:string,
        public Correo:string,
        public Contrasenya:string,
        public Administrador:boolean,
        public FotoPerfil:string
    ){}
}