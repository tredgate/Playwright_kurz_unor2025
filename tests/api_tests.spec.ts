import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("GET Request", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/train");
});

test("GET with params", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/eshop", {
    params: {
      userId: 111,
    },
  });
});

test("GET with headers", async ({ request }) => {
  await request.get("https://restful-booker.herokuapp.com/booking", {
    headers: {
      "Accept-Language": "en-US,en;q=0.9,cs-CZ;q=0.8,cs;q=0.7,it;q=0.6",
    },
  });
});

test("POST with Body", async ({ request }) => {
  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        email: "petr.fifka@example.org",
        username: faker.internet.username(),
        password: "123456",
      },
    }
  );
});

test("Data transfering", async ({ request }) => {
  const loginResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
    {
      data: {
        username: "Tristian.OConnell",
        password: "123456",
      },
    }
  );
  console.log(JSON.stringify(loginResponse, null, 2)); // vypíše výsledek loginu do konzole
  const loginResponseBody = await loginResponse.json();
  console.log("Login body: " + JSON.stringify(loginResponseBody, null, 2));
  const token = loginResponseBody.access_token;

  await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/profile",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
});

test("Assert response 200 OK", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  expect(response.status()).toBe(200);
});

test("Assert Header", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  const headers = response.headers();
  console.log(JSON.stringify(headers, null, 2));
  const contentTypeHeader = headers["content-type"];
  expect(contentTypeHeader).toBe("application/json; charset=utf-8"); // zkontroluje hlavička = hodnota
  expect(contentTypeHeader).toContain("application/json"); // zkontroluje, že hlavička obsahuje hodnotu
});

test("Assert body", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );
  const responseBody = await response.json();

  // Kontrola existence
  expect(responseBody.createdAt).toBeDefined();

  // Kontrola typu
  expect(typeof responseBody.active).toBe("number");
  console.log("Použití typeof (typu): " + typeof responseBody.email);

  // Kontrola hodnoty (dat)
  expect(responseBody.email).toBe("petr.fifka@tredgate.cz");
});

/*
Ve složce exercise vytvořte nový test soubor: api_asserts_exercise.spec.ts
Vytvořte volání API v playwright na https://tegb-backend-877a0b063d29.herokuapp.com/train
Metoda: PATCH
Otestujte, že timestamp je text, id = 1
*/
