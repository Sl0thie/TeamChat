namespace TeamChat.Hubs
{
    using System;
    using System.Diagnostics.CodeAnalysis;

    public class User : IEquatable<User>
    {
        public string ConnectionId
        {
            get { return connectionId; }
            set { connectionId = value; }
        }
        private string connectionId;

        public string UserName
        {
            get { return userName; }
            set { userName = value; }
        }
        private string userName;

        public DateTime Connected
        {
            get { return connected; }
            set { connected = value; }
        }
        private DateTime connected;

        public User(string connectionId, string userName)
        {
            this.connectionId = connectionId;
            this.userName = userName;
            connected = DateTime.Now;
        }

        public bool Equals([AllowNull] User other)
        {
            if (other == null) return false;
            return (this.connectionId.Equals(other.ConnectionId));
        }
    }
}
