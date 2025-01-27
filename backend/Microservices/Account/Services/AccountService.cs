using Account.Data;
using Microsoft.EntityFrameworkCore;

namespace Account.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserDbContext _db;

        public AccountService(UserDbContext db)
        {
            _db = db;
        }

        public async Task<bool> IsUserExists(string Email)
        {
            if (await _db.Players.FirstOrDefaultAsync(p => p.Email == Email) == null)
            {
                return false;
            }
            return true;
        }
    }
}