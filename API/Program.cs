using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.Entites;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<Korisnik>>();
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try 
            {
                await context.Database.MigrateAsync();
                await DbInitializer.Initialize(context, userManager);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Problem sa migracijom podataka");
            }
           
          await host.RunAsync();

        } //znaci da se pokrece unutar tog servera

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
                //koristi startup klasu za servise
    }
}
