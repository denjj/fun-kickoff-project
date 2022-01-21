const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const server = app.server;

chai.should();
chai.use(chaiHttp);

describe("POST /auth/logout", () => {
  it("returns 200 OK and clear token cookie", (done) => {
    chai
      .request(server)
      .post("/auth/logout")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.not.have.cookie("token");
        done();
      });
  });
});
