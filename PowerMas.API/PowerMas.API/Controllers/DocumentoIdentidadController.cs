using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PowerMas.API.Data;
using PowerMas.API.Models;

namespace PowerMas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentoIdentidadController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DocumentoIdentidadController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("pais/{pais}")]
        public async Task<ActionResult<IEnumerable<DocumentoIdentidad>>> GetPorPais(string pais)
        {
            try
            {
                var documentos = await _context.DocumentoIdentidad
                    .FromSqlInterpolated($"EXEC sp_DocumentoIdentidad_ObtenerPorPais {pais}")
                    .ToListAsync();

                return Ok(documentos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error al listar documentos"});
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentoIdentidad>> GetById(int id)
        {
            try
            {
                var documento = await _context.DocumentoIdentidad.FindAsync(id);
                if (documento == null)
                    return NotFound();

                return Ok(documento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error al obtener documento" });
            }
            
        }
    }
}
