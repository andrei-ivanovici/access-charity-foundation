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
            for (int i = 1; i <= order.TicketNumber; i++)
            {
                TicketEntity ticket = new TicketEntity();
                ticket.Name = i.ToString();
                ticket.Price = i;
                ticket.CharityId = order.CharityId;

                //var charityEntity = await _context.CharityEntity.FindAsync(order.CharityId);
                //charityEntity.Tickets.Add(ticket);
                //_context.Entry(charityEntity).State = EntityState.Modified;

                newTickets.Add(ticket);
            }

            _context.TicketEntity.AddRange(newTickets);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicketEntity", newTickets.ToArray());

        }
    }
}