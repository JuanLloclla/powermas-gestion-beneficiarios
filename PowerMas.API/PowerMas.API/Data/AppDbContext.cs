using Microsoft.EntityFrameworkCore;
using PowerMas.API.Models;

namespace PowerMas.API.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
        }

        public DbSet<DocumentoIdentidad> DocumentoIdentidad { get; set; }
        public DbSet<Beneficiario> Beneficiario { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Beneficiario>()
                .HasOne(b => b.DocumentoIdentidad)
                .WithMany()
                .HasForeignKey(b => b.DocumentoIdentidadId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
