using LotteryApi.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LotteryApi.Model
{
    public class TicketContract
    {
        public int Id { get;  set; }
        public int CharityId { get;  set; }
        public int LotteryId { get; set; }
    }
}
