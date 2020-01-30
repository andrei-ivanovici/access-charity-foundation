using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using LotteryApi.Model;

namespace LotteryApi.Data
{
    public class UserRepo
    {
        public UserEntity GetUserByName(string name)
        {
            using var userContext = new UserContext();
            return userContext.Users.FirstOrDefault(user => user.Mail == name);
        }

        public Task Save(UserEntity user)
        {
            using var userContext = new UserContext();
            userContext.Users.Add(user);

            userContext.SaveChanges();
            return Task.CompletedTask;
        }
    }
}