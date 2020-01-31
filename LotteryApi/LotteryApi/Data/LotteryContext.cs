using LotteryApi.Model;
using Microsoft.EntityFrameworkCore;
using LotteryApi.Model.Entities;

namespace LotteryApi.Data
{
    public class LotteryContext: DbContext
    {
        public DbSet<UserEntity> Users { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Server=tcp:testserver01.database.windows.net,1433;Initial Catalog=lottery;Persist Security Info=False;User ID=kiko;Password=9x5U3nbyvXMi;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }


        public DbSet<CharityEntity> CharityEntity { get; set; }

        public DbSet<TicketEntity> TicketEntity{ get; set; }



    }
}