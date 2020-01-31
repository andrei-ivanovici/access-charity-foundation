using System.Collections;
using System.Collections.Generic;

namespace LotteryApi.Model
{
    public class ProfileData
    {
        public UserContract User { get; set; }
        public List<PaymentContract> Payments { get; set; }
    }
}