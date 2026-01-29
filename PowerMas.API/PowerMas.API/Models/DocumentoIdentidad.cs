namespace PowerMas.API.Models
{
    public class DocumentoIdentidad
    {
        public int Id { get; set; }
        public string Nombre { get; set;  }
        public string Abreviatura { get; set; }
        public string Pais { get; set; }
        public int Longitud {  get; set; }
        public bool SoloNumeros { get; set; }
        public bool Activo { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaActualizacion { get; set; }
    }
}
