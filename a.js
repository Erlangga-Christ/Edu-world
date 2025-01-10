// const bcrypt = require("bcryptjs");
import bcrypt from "bcryptjs";

const hash = await bcrypt.hash("password1", 8);

console.log(hash);
