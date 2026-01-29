using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PowerMas.API.Data;
using PowerMas.API.Models;

namespace PowerMas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeneficiarioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BeneficiarioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Beneficiario>>> GetAll()
        {
            try
            {
                var beneficiarios = await _context.Beneficiario
                    .Include(b => b.DocumentoIdentidad)
                    .OrderBy(b => b.Id)
                    .ToListAsync();

                return Ok(beneficiarios);
            }
            catch (Exception ex) {
                return StatusCode(500, new { error = "Error al listar beneficiarios" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Beneficiario>> GetById(int id)
        {
            try
            {
                var beneficiario = await _context.Beneficiario
                    .Include(b => b.DocumentoIdentidad)
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (beneficiario == null)
                    return NotFound();

                return Ok(beneficiario);
            }
            catch (Exception ex) {
                return StatusCode(500, new { error = "Error al obtener beneficiario" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Beneficiario>> Create(CreateBeneficiarioDto dto)
        {
            try
            {
                var documento = await _context.DocumentoIdentidad.FindAsync(dto.DocumentoIdentidadId);
                if (documento == null)
                    return BadRequest("Tipo de documento no existe");

                if (dto.NumeroDocumento.Length != documento.Longitud)
                    return BadRequest($"El documento debe tener {documento.Longitud} caracteres");

                if (documento.SoloNumeros && !dto.NumeroDocumento.All(char.IsDigit))
                    return BadRequest("Este documento solo acepta números");

                var existe = await _context.Beneficiario.AnyAsync(b =>
                    b.NumeroDocumento == dto.NumeroDocumento &&
                    b.DocumentoIdentidadId == dto.DocumentoIdentidadId);

                if (existe)
                    return BadRequest("Ya existe beneficiario con este documento");

                var beneficiario = new Beneficiario
                {
                    Nombres = dto.Nombres,
                    Apellidos = dto.Apellidos,
                    DocumentoIdentidadId = dto.DocumentoIdentidadId,
                    NumeroDocumento = dto.NumeroDocumento,
                    FechaNacimiento = dto.FechaNacimiento,
                    Sexo = dto.Sexo,
                    FechaCreacion = DateTime.Now,
                    FechaActualizacion = DateTime.Now
                };

                _context.Beneficiario.Add(beneficiario);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = beneficiario.Id }, beneficiario);
            }catch(Exception ex)
            {
                return StatusCode(500, new { error = "Error al registrar beneficiario"});
            }
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreateBeneficiarioDto dto)
        {
            try
            {
                var beneficiario = await _context.Beneficiario.FindAsync(id);
                if (beneficiario == null)
                    return NotFound();

                var documento = await _context.DocumentoIdentidad.FindAsync(dto.DocumentoIdentidadId);
                if (documento == null)
                    return BadRequest("Tipo de documento no existe");

                beneficiario.Nombres = dto.Nombres;
                beneficiario.Apellidos = dto.Apellidos;
                beneficiario.DocumentoIdentidadId = dto.DocumentoIdentidadId;
                beneficiario.NumeroDocumento = dto.NumeroDocumento;
                beneficiario.FechaNacimiento = dto.FechaNacimiento;
                beneficiario.Sexo = dto.Sexo;
                beneficiario.FechaActualizacion = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(beneficiario);
            }
            catch (Exception ex) {
                return StatusCode(500, new { error = "Error al actualizar beneficiario" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var beneficiario = await _context.Beneficiario.FindAsync(id);
                if (beneficiario == null)
                    return NotFound();

                _context.Beneficiario.Remove(beneficiario);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex) {
                return StatusCode(500, new { error = "Error al eliminar beneficiario" });
            }
        }
    }

    public class CreateBeneficiarioDto
    {
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public int DocumentoIdentidadId { get; set; }
        public string? NumeroDocumento { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public char Sexo { get; set; }
    }
}
