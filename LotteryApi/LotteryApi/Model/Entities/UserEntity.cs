using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using LotteryApi.Model.Entities;

namespace LotteryApi.Model
{
    [Table("User")]
    public class UserEntity
    {
        public UserEntity()
        {
            this.Tickets = new List<TicketEntity>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Mail { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public ICollection<PaymentEntity> Payments { get; set; }
        public ICollection<TicketEntity> Tickets { get; set; }
        
    }
}