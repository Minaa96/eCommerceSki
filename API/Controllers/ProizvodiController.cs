using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entites;
using API.Extensions;
using API.RequestHelpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   
    public class ProizvodiController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
       
        public ProizvodiController(StoreContext context, IMapper mapper)
        {
             _mapper = mapper;
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

        [HttpGet("{id}", Name = "GetProizvod")]  //primer -> api/Psroizvodi/3

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

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Proizvod>> CreateProduct([FromForm] CreateProductDto proizvodDto)
        {
            var proizvod = _mapper.Map<Proizvod>(proizvodDto);

            _context.Proizvodi.Add(proizvod);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProizvod", new {Id = proizvod.Id}, proizvod);

            return BadRequest(new ProblemDetails {Title = "Problem sa kreiranjem proizvoda"}); 
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Proizvod>> UpdateProduct([FromForm]UpdateProductDto proizvodDto)
        {
            var proizvod = await _context.Proizvodi.FindAsync(proizvodDto.Id);

            if (proizvod == null) return NotFound();

            _mapper.Map(proizvodDto, proizvod);

            //if (proizvodDto.File != null) 
           //{
                //var imageResult = await _imageService.AddImageAsync(proizvodDto.File);

                //if (imageResult.Error != null) 
                   // return BadRequest(new ProblemDetails{Title = imageResult.Error.Message});

                //if (!string.IsNullOrEmpty(proizvodDto.)) 
                    //await _imageService.DeleteImageAsync(proizvodDto.PublicId);

                //proizvod.PictureUrl = imageResult.SecureUrl.ToString();
               // proizvod.PublicId = imageResult.PublicId;
          //  }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(proizvod);

            return BadRequest(new ProblemDetails { Title = "Problem sa menjanjem proizvoda" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var proizvod = await _context.Proizvodi.FindAsync(id);

            if (proizvod == null) return NotFound();

           // if (!string.IsNullOrEmpty(proizvod.PublicId)) 
             //   await _imageService.DeleteImageAsync(proizvod.PublicId);

            _context.Proizvodi.Remove(proizvod);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem sa brisanjem proizvoda" });
        }
    }
}