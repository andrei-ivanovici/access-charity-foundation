using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LotteryApi.Data;
using LotteryApi.Model;
using LotteryApi.Model.Entities;

namespace LotteryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharityEntitiesController : ControllerBase
    {
        private readonly LotteryContext _context;

        public CharityEntitiesController(LotteryContext context)
        {
            _context = context;
        }


       
        // GET: api/CharityEntities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CharityEntity>>> GetCharityEntity()
        {
            return await _context.CharityEntity.ToListAsync();
        }

        // GET: api/CharityEntities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CharityEntity>> GetCharityEntity(int id)
        {
            var charityEntity = await _context.CharityEntity.FindAsync(id);

            if (charityEntity == null)
            {
                return NotFound();
            }

            return charityEntity;
        }

        // PUT: api/CharityEntities/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCharityEntity(int id, CharityEntity charityEntity)
        {
            if (id != charityEntity.Id)
            {
                return BadRequest();
            }

            _context.Entry(charityEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharityEntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CharityEntities
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<CharityEntity>> PostCharityEntity(CharityEntity charityEntity)
        {
            _context.CharityEntity.Add(charityEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCharityEntity", new { id = charityEntity.Id }, charityEntity);
        }

        // DELETE: api/CharityEntities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CharityEntity>> DeleteCharityEntity(int id)
        {
            var charityEntity = await _context.CharityEntity.FindAsync(id);
            if (charityEntity == null)
            {
                return NotFound();
            }

            _context.CharityEntity.Remove(charityEntity);
            await _context.SaveChangesAsync();

            return charityEntity;
        }

        private bool CharityEntityExists(int id)
        {
            return _context.CharityEntity.Any(e => e.Id == id);
        }
    }
}
