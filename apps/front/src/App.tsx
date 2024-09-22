import { Button } from "@/components/ui/button";

function App() {
  return (
    <div>
      <Button
        onClick={() => {
          fetch("http://localhost:3333/register", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: "pau.antone2@gmail.com",
              name: "Paul",
              password: "admin1",
            }),
          });
        }}
      >
        Hello world
      </Button>
    </div>
  );
}

export default App;
