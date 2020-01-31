using LotteryApi.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LotteryApi.Model.Entities
{
    [Table("Charity")]
    public class CharityEntity
    {
        public CharityEntity()
        {
            this.CharityLottery = new HashSet<CharityLotteryEntity>();
        }
        public int Id { get; set; }

        public string Name { get; set; }

        //public ICollection<TicketEntity> Tickets { get; set; }
        public virtual ICollection<CharityLotteryEntity> CharityLottery { get; set; }
    }
}
