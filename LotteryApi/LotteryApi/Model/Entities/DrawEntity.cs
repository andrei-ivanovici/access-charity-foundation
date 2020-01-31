using System;
using System.Data.Common;

namespace LotteryApi.Model.Entities
{
    public class DrawEntity
    {
        public int Id { get; set; }
        public int TicketId { get; set; }
        public TicketEntity Ticket { get; set; }
        public DateTime DrawDate { get; set; }
    }
}