const url = "http://localhost:5000/api/users/current";
getCurrentUser(url)
  .then((data) => {
    console.log(data);
    $(".fullName").html(data.fullName);
    $("#currentUser").html(`
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Full name: ${data.fullName}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Email: ${data.email}</h6>
        <p class="card-text">Age: ${data.age}</p>
        <p class="card-text">Phone Number: ${data.phone}</p>
      </div>
    </div>
  `);
  })
  .catch((error) => {
    window.location.href = "http://localhost:3000";
    $("#loginModal").modal("show");
  });
