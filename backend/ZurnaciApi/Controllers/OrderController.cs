using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZurnaciApi.Data;
using ZurnaciApi.Models;

namespace ZurnaciApi.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Items)
                .ToListAsync();

            return Ok(orders);
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<Order>> GetOrder([FromRoute] int id)
        {
            var order = await _context.Orders
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        [HttpGet("myorders/{userId}")]
        public async Task<ActionResult<List<Order>>> GetMyOrders(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

           
            var orders = await _context.Orders
                .Where(o => user.OrderId.Contains(o.Id)) 
                .ToListAsync();

            return Ok(orders);
        }


        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder([FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(errors);
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            
            var user = await _context.Users.FindAsync(order.UserId);
            if (user != null)
            {   
                user.OrderId.Add(order.Id);
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }

            
            if (order.Items != null && order.Items.Count > 0)
            {
                foreach (var item in order.Items)
                {
                    item.OrderId = order.Id; 
                    _context.Items.Add(item);
                }
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }







        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOrder([FromRoute] int id, [FromBody] Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        [HttpPost("update-status/{id:int}")]
        public async Task<IActionResult> UpdateOrderStatus([FromRoute] int id, [FromBody] Dtos.OrderStatusUpdate requestValue)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            order.Status = requestValue.Status; 
            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "An error occurred while updating the order status.");
            }

            return NoContent();  
        }




        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOrder([FromRoute] int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
