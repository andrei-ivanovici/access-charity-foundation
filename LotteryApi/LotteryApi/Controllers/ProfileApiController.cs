using LotteryApi.Data;
using LotteryApi.Model;
using LotteryApi.Model.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LotteryApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfileApiController : ControllerBase
    {
        private readonly UserRepo _repo;

        public ProfileApiController(UserRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("{id}")]
        public ProfileData LoadProfile(int id)
        {
            return _repo.GetUserProfile(id);
        }

        [HttpPost("")]
        public UserEntity SaveProfile(UserEntity user)
        {
            return _repo.UpdateProfile(user);
        }

        [HttpPost("{id}/payment")]
        public void SavePayment(int id, [FromBody] PaymentEntity paymentEntity)
        {
            _repo.SavePayment(id, paymentEntity);
        }

        [HttpDelete("{id}/payment/{paymentId}")]
        public void RemovePayment(int id, int paymentId)
        {
            _repo.RemovePayment(id, paymentId);
        }
    }
}