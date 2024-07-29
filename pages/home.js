export default function home() {
  return (
    <div class="container mt-5">
      <h2>user Added form </h2>
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter your name"
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">
            Phone
          </label>
          <input
            type="tel"
            class="form-control"
            id="phone"
            placeholder="Enter your phone number"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter your email address"
          />
        </div>
        <div class="mb-3">
          <label for="age" class="form-label">
            Age
          </label>
          <input
            type="number"
            class="form-control"
            id="age"
            placeholder="Enter your age"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
