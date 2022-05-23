export class Post{
    constructor(
        public _id:string,
        public UsuarioCreador:string,
        public Titulo:string,
        public TextoPost:string,
        public FechaHora:string,
        public NombreJuego:string,
        public NombreForo:string,
        public eliminar:boolean,
    ){}
}