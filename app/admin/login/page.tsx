import { login } from "./actions";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="admin-login-mark">AA</div>
        <p className="eyebrow">PRIVATE ACCESS</p>
        <h1>Alim Portfolio Studio</h1>
        <p>Only your authorised admin account can edit or publish this portfolio.</p>

        {params.error && (
          <div className="form-error">
            {params.error === "unauthorised"
              ? "This account is not authorised."
              : "Unable to sign in. Check your details."}
          </div>
        )}

        <form action={login} className="form-stack">
          <label>Email<input name="email" type="email" required /></label>
          <label>Password<input name="password" type="password" required /></label>
          <button className="button button-primary">Sign in</button>
        </form>
      </section>
    </main>
  );
}
