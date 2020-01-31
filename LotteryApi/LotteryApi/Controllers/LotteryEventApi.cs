using System.Linq;
using System.Threading.Tasks;
using LotteryApi.Data;
using LotteryApi.Model;
using LotteryApi.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LotteryApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LotteryEventApiController : ControllerBase
    {
        private readonly LotteryEventRepo _repo;
        private readonly LotteryContext _ctx;

        public LotteryEventApiController(LotteryEventRepo repo, LotteryContext ctx)
        {
            _repo = repo;
            _ctx = ctx;
        }

        [HttpPost]
        public void Create(CreateLotteryEventContract contract)
        {
            _repo.Save(contract);
        }

        [HttpGet]
        [Route("latest")]
        public LotteryInfo GetLatestLottery()
        {
            var latestLottery = _ctx.LotteryEntity.OrderByDescending(l => l.Id)
                .Include(l => l.LoteryCharity)
                .ThenInclude(lc => lc.Charity)
                .First();

            return new LotteryInfo
            {
                Id = latestLottery.Id,
                Name = latestLottery.Name,
                Price = latestLottery.Price,
                Charities = latestLottery.LoteryCharity
                    .Select(lc => lc.Charity)
                    .Select(c => new CharityContract
                    {
                        Id = c.Id,
                        Name = c.Name
                    }).ToList()
            };
        }
    }
}