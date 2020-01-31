using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LotteryApi.Data;
using LotteryApi.Model.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LotteryApi.Controllers
{
    public class Order
    {
        public int TicketNumber { get; set; }
        public int CharityId { get; set; }
        public int UserId { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase

    {
        private readonly LotteryContext _context;


        public OrderController(LotteryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketEntity>>> GetTicketEntity()
        {
            return await _context.TicketEntity.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TicketEntity[]>> SubmitOrder(Order order)
        {
            List<TicketEntity> newTickets = new List<TicketEntity>();

            var user = _context.Users
                .First(u => u.Id == order.UserId);
            for (int i = 1; i <= order.TicketNumber; i++)
            {
                TicketEntity ticket = new TicketEntity();
                ticket.Name = i.ToString();
                ticket.Price = i;
                ticket.CharityId = order.CharityId;
                user.Tickets.Add(ticket);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicketEntity", newTickets.ToArray());
        }
    }
}