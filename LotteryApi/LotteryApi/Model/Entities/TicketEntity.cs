using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace LotteryApi.Model.Entities
{
    [Table("Ticket")]
    public class TicketEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }

        public int LotteryId { get; set; }
        public int CharityId { get; set; }
        public UserEntity User { get; set; }
        public DrawEntity Draw { get; set; }
        public LotteryEventEntity Lottery { get; set; }
    }
}