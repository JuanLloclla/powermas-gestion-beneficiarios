namespace PowerMas.API.Models
{
    public class Beneficiario
    {
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public int DocumentoIdentidadId { get; set; }
        public string NumeroDocumento { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public char Sexo { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaActualizacion { get; set; }
        public DocumentoIdentidad DocumentoIdentidad { get; set; }
    }
}
