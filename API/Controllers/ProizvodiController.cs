using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using API.Data;
using API.Entites;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   
    public class ProizvodiController : BaseApiController
    {
        private readonly StoreContext _context;
       
        public ProizvodiController(StoreContext context)
        {
            _context = context;
            
        }
        
        [HttpGet]
        public async Task<ActionResult<PagedList<Proizvod>>> GetProizvodi([FromQuery]ProductParams productParams)  //da bi vise ljudi moglo da pristupa stranici u isto vreme
        {
           var query = _context.Proizvodi
          .Sort(productParams.OrderBy)
          .Search(productParams.searchTerm)
          .Filter(productParams.Brend, productParams.Tip)
          .AsQueryable();

           var proizvod = await PagedList<Proizvod>.ToPagedList(query,
                 productParams.PageNumber, productParams.PageSize);

            

            Response.AddPaginationHeader(proizvod.MetaData);

            return proizvod;
        }

        [HttpGet("{id}")]  //primer -> api/Psroizvodi/3

        public async Task<ActionResult<Proizvod>> GetProizvod(int id)
        {
            var proizvod = await _context.Proizvodi.FindAsync(id);

            if (proizvod == null) return NotFound();

            return proizvod;

        }

         [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brend = await _context.Proizvodi.Select(p => p.Brend).Distinct().ToListAsync();
            var tip = await _context.Proizvodi.Select(p => p.Tip).Distinct().ToListAsync();

            return Ok(new { brend, tip });
        }
    }
}