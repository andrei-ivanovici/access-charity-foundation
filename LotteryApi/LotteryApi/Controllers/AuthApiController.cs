using System.Threading.Tasks;
using LotteryApi.Data;
using LotteryApi.Model;
using Microsoft.AspNetCore.Mvc;

namespace LotteryApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthApiController : ControllerBase
    {
        private readonly UserRepo _repo;

        public AuthApiController(UserRepo repo)
        {
            _repo = repo;
        }

        [HttpPost("login")]
        public UserEntity Login(UserCredentials credentials)
        {
            var user = _repo.GetUserByName(credentials.Username);
            if (user == null)
            {
                return null;
            }

            return user.Password == credentials.Password ? user : null;
        }

        [HttpPost("register")]
        public async Task<UserEntity> Register(UserEntity user)
        {
            await _repo.Save(user);
            return user;
        }
    }
}