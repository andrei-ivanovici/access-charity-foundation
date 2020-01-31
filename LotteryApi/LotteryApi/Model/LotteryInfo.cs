using System.Collections.Generic;

namespace LotteryApi.Model
{
    public class LotteryInfo
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public List<CharityContract> Charities { get; set; }
        public int Id { get; set; }
    }
}