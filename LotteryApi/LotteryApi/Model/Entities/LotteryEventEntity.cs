using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace LotteryApi.Model.Entities
{
    [Table("LotteryEvent")]
    public class LotteryEventEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public DateTime DrawDate { get; set; }
    }
}
