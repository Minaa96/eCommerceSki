using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entites;

namespace API.Extensions
{
    public static class ProizvodExtensions
    {
        public static IQueryable<Proizvod> Sort(this IQueryable<Proizvod> query, string orderBy) {

            if (string.IsNullOrWhiteSpace(orderBy)) 
            return query.OrderBy(p => p.Ime);

            query = orderBy switch 
           {
            "price" => query.OrderBy(p => p.Cena),
            "priceDesc" => query.OrderByDescending(p => p.Cena),
            _ => query.OrderBy(p => p.Ime)
           };

           return query;
        }

        public static IQueryable<Proizvod> Search(this IQueryable<Proizvod> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
            return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
            return query.Where(p => p.Ime.ToLower().Contains(lowerCaseSearchTerm));


        }
        public static IQueryable<Proizvod> Filter(this IQueryable<Proizvod> query, string brend, string tip)
        {
            var brendList = new List<string>();
            var tipList = new List<string>();

            if(!string.IsNullOrEmpty(brend))
                brendList.AddRange(brend.ToLower().Split(",").ToList());

            if(!string.IsNullOrEmpty(tip))
                tipList.AddRange(tip.ToLower().Split(",").ToList());

            query = query.Where(p => brendList.Count == 0 || brendList.Contains(p.Brend.ToLower()));
            query = query.Where(p => tipList.Count == 0 || tipList.Contains(p.Tip.ToLower()));

            return query;
        }
    }
}