import Header from "./Header";
import Main from "./Main";

export default function App() {
  return (
    <div className="app">
      <Header />

      <main className="main">
        <Main>
          <p>1/15</p>
          <p>Questions?</p>
        </Main>
      </main>
    </div>
  );
}
