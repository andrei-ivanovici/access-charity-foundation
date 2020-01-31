using LotteryApi.Model;
using LotteryApi.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LotteryApi.Data
{
    public class LotteryEventRepo
    {
        internal void Save(CreateLotteryEventContract contract)
        {
            using var ctx = new LotteryContext();
            var lotteryEvent = new LotteryEventEntity
            {
                Name = contract.Name,
                DrawDate = contract.DrawDate,
                Price = contract.Price
            };
            
            var charities =contract.Charities.Select(c => ctx.CharityEntity.First(entity => entity.Id == c.Id));

            foreach( var c  in charities)
            {
                lotteryEvent.LoteryCharity.Add(new CharityLotteryEntity()
                {
                    Lottery = lotteryEvent,
                    Charity = c
            });
            }
            ctx.LotteryEntity.Add(lotteryEvent);

            ctx.SaveChanges();
        }
    }
}