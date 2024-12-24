using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZurnaciApi.Data;
using ZurnaciApi.Handler;
using ZurnaciApi.Models;


namespace ZurnaciApi.Controllers
{
    [Route("api/food")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FoodController(ApplicationDbContext context)
        {
            _context = context;
        }

  
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Food>>> GetFoods()
        {
            return await _context.Foods.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Food>> GetFood([FromRoute] int id)
        {
            var food = await _context.Foods.FindAsync(id);

            if (food == null)
            {
                return NotFound();
            }

            return Ok(food);
        }

        [HttpGet("uploads/foods/{fileName}")]
        public IActionResult GetFoodImage(string fileName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", "Foods", fileName);
            if (System.IO.File.Exists(filePath))
            {
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                return File(fileBytes, "image/jpeg"); // Dosya tipi gerektiği gibi ayarlanabilir
            }
            return NotFound();
        }

        [HttpPost]

        public async Task<ActionResult<Food>> AddFood([FromForm] Food food, IFormFile imageFile)
        {
            if (imageFile != null)
            {
                var imageName = await FoodImageUploadHandler.UploadImageAsync(imageFile);
                food.Image = imageName;
            }

            _context.Foods.Add(food);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFoods), new { id = food.Id }, food);
        }
        
        //public async Task<ActionResult<Food>> AddFood([FromBody]  Food food)
        //{
        //    _context.Foods.Add(food);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetFoods), new { id = food.Id }, food);
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFood([FromRoute] int id)
        {
            var food = await _context.Foods.FindAsync(id);
            if (food == null)
            {
                return NotFound();
            }

            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", "Foods", food.Image);

            bool isDeleted = FileDeleteHandler.DeleteFile(filePath);

            if (!isDeleted)
            {
                return BadRequest("File could not be deleted.");
            }

            _context.Foods.Remove(food);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateFood(int id, [FromBody] Food food)
        {
            if (id != food.Id)
            {
                return BadRequest();
            }

            _context.Entry(food).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FoodExists(id))
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

        private bool FoodExists(int id)
        {
            return _context.Foods.Any(e => e.Id == id);
        }

    }
}
