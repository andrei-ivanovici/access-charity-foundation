using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LotteryApi.Model.Entities
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