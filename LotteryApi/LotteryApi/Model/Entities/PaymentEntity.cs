using System.ComponentModel.DataAnnotations.Schema;

namespace LotteryApi.Model
{
    [Table("Payment")]
    public class PaymentEntity
    {
        public int Id { get; set; }
        public  int UserId { get; set; }
        public string cardNumber { get; set; }
        public string cardType { get; set; }
        public UserEntity User { get; set; }
    }
}