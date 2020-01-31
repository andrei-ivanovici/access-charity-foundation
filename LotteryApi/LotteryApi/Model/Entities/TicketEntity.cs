using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LotteryApi.Model.Entities
{
    [Table("Ticket")]
    public class TicketEntity
    {

        public int Id { get; set; }
        public int Price { get; set; }
        public string Name { get; set; }

        public int CharityId { get; set; }
    }
}
