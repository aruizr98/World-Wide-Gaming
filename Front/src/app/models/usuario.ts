export class Usuario{
    public Contrasenya2:string;
    constructor(
        public _id:string,
        public NombreUsuario:string,
        public Nombre:string,
        public Apellidos:string,
        public Correo:string,
        public Contrasenya:string,
        public Administrador:boolean,
        public FotoPerfil:string,
        public idEvento:Array<string>,
        public Favoritos:Array<string>,
        public Facebook: string,
        public Twitter: string,
        public Instagram: string,
        public Discord: string,
        public Steam: string,
        public Epic: string,
        public Twitch: string,
        public Youtube: string,
    ){}
}