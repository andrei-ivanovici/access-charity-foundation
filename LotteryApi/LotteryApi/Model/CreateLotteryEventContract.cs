using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LotteryApi.Model
{
    public class CreateLotteryEventContract
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public DateTime DrawDate { get; set; }
        public  List<CharityContract> Charities { get; set; }
    }
}
