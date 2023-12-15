const register = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!res.ok) throw new Error(data.message);

    return res.json();
  } catch (error) {
    throw error;
  }
};

const login = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!res.ok) throw new Error(data.message);
    return res.json();
  } catch (error) {
    throw error;
  }
};

const registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fullName = registerForm.fullName.value;
  const email = registerForm.email.value;
  const age = registerForm.age.value;
  const phone = registerForm.phone.value;
  const password = registerForm.password.value;

  const url = "http://localhost:5000/api/users/register";
  try {
    await register(url, {
      fullName,
      email,
      age: +age,
      phone,
      password,
    });
    $("#registerModal").modal("hide");
  } catch (error) {
    alert(error.message);
  }
});

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  const url = "http://localhost:5000/api/users/login";
  try {
    const data = await login(url, {
      email,
      password,
    });
    localStorage.setItem("accessToken", data.accessToken);
    window.location.href = "/account.html";
  } catch (error) {
    alert(error.message);
  }
});
