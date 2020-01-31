using System.ComponentModel.DataAnnotations.Schema;

namespace LotteryApi.Model.Entities
{
    [Table("LotteryCharity")]
    public class CharityLotteryEntity
    {
        public int LotteryId { get; set; }
        public int CharityId { get; set; }
        public LotteryEventEntity Lottery { get; set; }
        public CharityEntity Charity { get; set; }
    }
}