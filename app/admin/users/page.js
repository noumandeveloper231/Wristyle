export default async function AdminUsers() {
  let userList = [];
  try {
    const res = await fetch("https://api.clerk.com/v1/users?limit=50", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
      cache: "no-store",
    });
    if (res.ok) {
      userList = await res.json();
    }
  } catch (e) {
    userList = [];
  }

  const formatEmail = (u) => {
    const primary =
      u.emailAddresses?.find((e) => e.id === u.primaryEmailAddressId) ||
      u.email_addresses?.find((e) => e.id === u.primary_email_address_id);
    return (
      primary?.emailAddress ||
      primary?.email_address ||
      u.emailAddresses?.[0]?.emailAddress ||
      u.email_addresses?.[0]?.email_address ||
      ""
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-primary mb-8">Users</h1>
      <div className="bg-white border border-muted rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-3 bg-secondary text-secondary-foreground font-bold">
          <div className="col-span-4">Email</div>
          <div className="col-span-3">User ID</div>
          <div className="col-span-3">Created</div>
          <div className="col-span-2">Status</div>
        </div>
        {userList.length === 0 ? (
          <div className="px-4 py-8 text-center text-muted-foreground">No users found</div>
        ) : (
          userList.map((u) => (
            <div key={u.id} className="grid grid-cols-12 px-4 py-3 border-t border-muted">
              <div className="col-span-4 text-primary">{formatEmail(u)}</div>
              <div className="col-span-3 text-muted-foreground">{u.id}</div>
              <div className="col-span-3 text-muted-foreground">{new Date(u.createdAt || u.created_at).toLocaleDateString()}</div>
              <div className="col-span-2 text-muted-foreground">{u.locked ? "Locked" : "Active"}</div>
            </div>
          ))
        )}
      </div>
      <div className="text-sm text-muted-foreground mt-4">
        If no users appear, verify `CLERK_SECRET_KEY` in `.env.local`. Advanced actions are available in the Clerk Dashboard.
      </div>
    </div>
  );
}
