namespace backend.Model
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public int UserId { get; set; }
        public string UserType { get; set; }
    }
}
