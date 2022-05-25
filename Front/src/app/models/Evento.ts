export class Evento{
    constructor(
        public _id:string,
        public Nombre:string,
        public FechaHora:string,
        public Descripcion:string,
        public NombreJuego:string,
        public Creador:string,
        public UsuariosApuntados:string[]
    ){}
}