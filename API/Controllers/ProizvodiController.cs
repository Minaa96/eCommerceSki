using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProizvodiController : ControllerBase
    {
        private readonly StoreContext _context;
       
        public ProizvodiController(StoreContext context)
        {
            _context = context;
            
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Proizvod>>> GetProizvodi()  //da bi vise ljudi moglo da pristupa stranici u isto vreme
        {
            var proizvodi = await _context.Proizvodi.ToListAsync();

            return Ok(proizvodi);
        }

        [HttpGet("{id}")]  //primer -> api/Psroizvodi/3

        public async Task<ActionResult<Proizvod>> GetProizvod(int id)
        {
            return await _context.Proizvodi.FindAsync(id);

        }
    }
}