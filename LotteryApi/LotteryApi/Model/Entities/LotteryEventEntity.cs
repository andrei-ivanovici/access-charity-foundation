using LotteryApi.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LotteryApi.Model.Entities
{
    [Table("LotteryEvent")]
    public class LotteryEventEntity
    {
        public LotteryEventEntity()
        {
            LoteryCharity = new List<CharityLotteryEntity>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public DateTime DrawDate { get; set; }

        public virtual ICollection<CharityLotteryEntity> LoteryCharity { get; set; }
    }
}
