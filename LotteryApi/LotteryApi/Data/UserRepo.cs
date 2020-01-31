using System;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LotteryApi.Model;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;

namespace LotteryApi.Data
{
    public class UserRepo
    {
        public UserEntity GetUserByName(string name)
        {
            using var userContext = new LotteryContext();
            return userContext.Users.FirstOrDefault(user => user.Mail == name);
        }

        public Task Save(UserEntity user)
        {
            using var userContext = new LotteryContext();
            userContext.Users.Add(user);

            userContext.SaveChanges();
            return Task.CompletedTask;
        }

        public ProfileData GetUserProfile(int id)
        {
            using var userContext = new LotteryContext();
            var result = userContext.Users
                    .Include(u => u.Payments)
                    .FirstOrDefault(user => user.Id == id)
                ;
            if (result == null)
            {
                return null;
            }

            return new ProfileData()
            {
                Payments = result.Payments.Select(p => new PaymentContract
                {
                    cardNumber = p.cardNumber,
                    cardType = p.cardType,
                    Id = p.Id
                }).ToList(),
                User = new UserContract()
                {
                    Address = result.Address,
                    Avatar = result.Avatar,
                    Id = result.Id,
                    Mail = result.Mail,
                    Name = result.Name,
                    Role = result.Role
                }
            };
        }

        public void SavePayment(int id, PaymentEntity paymentEntity)
        {
            using var userContext = new LotteryContext();
            var result = userContext.Users
                .Include(user => user.Payments)
                .FirstOrDefault(user => user.Id == id);
            if (result == null)
            {
                throw new Exception("Not found");
            }

            result.Payments.Add(paymentEntity);
            userContext.SaveChanges();
        }

        public void RemovePayment(int id, int paymentId)
        {
            using var userContext = new LotteryContext();
            var result = userContext.Users
                .Include(user => user.Payments)
                .FirstOrDefault(user => user.Id == id);

            if (result == null)
            {
                throw new Exception("Not found");
            }

            var payment = result.Payments.FirstOrDefault(p => p.Id == paymentId);
            if (payment == null)
            {
                throw new Exception("Not found");
            }

            result.Payments.Remove(payment);
            userContext.SaveChanges();
        }

        public UserEntity UpdateProfile(UserEntity user)
        {
            using var userContext = new LotteryContext();
            userContext.Users.Update(user);
            userContext.SaveChanges();
            return user;
        }
    }
}