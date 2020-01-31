using System.Threading.Tasks;
using LotteryApi.Data;
using LotteryApi.Model.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LotteryApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LotteryEventApiController : ControllerBase
    {
        private readonly LotteryEventRepo _repo;
        public LotteryEventApiController(LotteryEventRepo repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public LotteryEventEntity Create()
        {
            return null;
        }
    }
}
