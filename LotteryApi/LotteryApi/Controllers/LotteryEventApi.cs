using System;
using System.Linq;
using LotteryApi.Data;
using LotteryApi.Model;
using LotteryApi.Model.Draw;
using LotteryApi.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;
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


        [HttpGet]
        [Route("lastDraw")]
        public DrawResult GetLastDraw()
        {
            var lastDraw = _ctx.Draws.OrderByDescending(d => d.Id).First();
            var ticket = _ctx.TicketEntity
                .Include(t => t.User)
                .Include(t => t.Lottery)
                .ThenInclude(l => l.Tickets)
                .First(t => t.Id == lastDraw.TicketId);

            var charity = _ctx.CharityEntity.First(c => c.Id == ticket.CharityId);
            return new DrawResult()
            {
                Charity = new DrawCharity()
                {
                    Id = charity.Id,
                    Name = charity.Name
                },
                Ticket = new DrawTicket()
                {
                    Id = ticket.Id,
                    Name = ticket.Name
                },
                User = new DrawnUser()
                {
                    Id = ticket.User.Id,
                    Name = ticket.User.Name
                },
                TotalParticipants = ticket.Lottery.Tickets.Count
            };
        }


        [HttpGet]
        [Route("draw")]
        public DrawResult DrawWinner()
        {
            var generator = new Random();

            var latestLottery = _ctx.LotteryEntity.OrderByDescending(l => l.Id)
                .Include(l => l.Tickets)
                .ThenInclude(t => t.User)
                .Include(l => l.LoteryCharity)
                .ThenInclude(c => c.Charity)
                .First();

            var pool = latestLottery.Tickets.OrderBy(t => t.Id).ToList();
            var winningNumber = generator.Next(pool.Count);
            var winingTicket = pool[winningNumber];
            var winningUser = winingTicket.User;
            var voteResult = pool.GroupBy(p => p.CharityId)
                .Select(g => new
                {
                    CharityId = g.Key,
                    Votes = g.Count()
                }).OrderByDescending(c => c.Votes)
                .First();

            var winningCharity = this._ctx.CharityEntity.First(c => c.Id == voteResult.CharityId);

            var result = new DrawResult
            {
                TotalParticipants = pool.Count,
                Ticket = new DrawTicket()
                {
                    Id = winingTicket.Id,
                    Name = winingTicket.Name
                },
                User = new DrawnUser()
                {
                    Name = winningUser.Name,
                    Id = winningUser.Id
                },
                Charity = new DrawCharity
                {
                    Id = winningCharity.Id,
                    Name = winningCharity.Name
                }
            };

            var drawEntity = new DrawEntity()
            {
                TicketId = winingTicket.Id
            };
            _ctx.Draws.Add(drawEntity);
            _ctx.SaveChanges();
            return result;
        }
    }
}