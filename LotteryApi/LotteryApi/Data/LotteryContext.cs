using LotteryApi.Model;
using Microsoft.EntityFrameworkCore;
using LotteryApi.Model.Entities;

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

            modelBuilder.Entity<CharityLotteryEntity>().HasKey(sc => new { sc.CharityId, sc.LotteryId });
            modelBuilder.Entity<CharityLotteryEntity>()
                         .HasOne<LotteryEventEntity>(sc => sc.Lottery)
                         .WithMany(lotteryEvent => lotteryEvent.LoteryCharity)
                         .HasForeignKey(charityLottery => charityLottery.LotteryId);

            modelBuilder.Entity<CharityLotteryEntity>()
                         .HasOne<CharityEntity>(sc => sc.Charity)
                         .WithMany(charity => charity.CharityLottery)
                         .HasForeignKey(charityLottery => charityLottery.CharityId);
        }


        public DbSet<CharityEntity> CharityEntity { get; set; }
        public DbSet<LotteryEventEntity> LotteryEntity { get; set; }

        public DbSet<TicketEntity> TicketEntity{ get; set; }
        public DbSet<CharityLotteryEntity> CharityLottery{ get; set; }
    }
}