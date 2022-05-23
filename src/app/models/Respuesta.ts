export class Respuesta{
    constructor(
        public _id:string,
        public PostId:string,
        public UsuarioCreador:string,
        public Respuesta:string,
        public FechaHora:string,
        public eliminar:boolean,
    ){}
}