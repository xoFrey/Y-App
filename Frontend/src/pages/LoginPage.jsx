import { Link } from "react-router-dom";
import "./css/LoginPage.css";


const LoginPage = () => {

  return (
    <section className="loginpage">
      <header>
        <div>
          <img src="/img/goose_white.png" alt="" />
        </div>
      </header>
      <main className="loginpage-main">
        <h1>Quack los in die Welt!</h1>
        <Link to="/login"><button >Login</button>
        </Link>
        <Link to="/register"><button >Register</button>
        </Link>
      </main>
    </section>);
};

export default LoginPage;
