using LotteryApi.Model;
using Microsoft.EntityFrameworkCore;

namespace LotteryApi.Data
{
    public class LotteryContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<PaymentEntity> Payments { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Server=tcp:testserver01.database.windows.net,1433;Initial Catalog=lottery;Persist Security Info=False;User ID=kiko;Password=9x5U3nbyvXMi;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PaymentEntity>()
                .HasOne<UserEntity>(s => s.User)
                .WithMany(g => g.Payments)
                .HasForeignKey(s => s.UserId);
        }
    }
}