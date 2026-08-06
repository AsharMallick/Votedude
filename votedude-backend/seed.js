// Run with: npm run seed
const dotenv = require("dotenv");
dotenv.config();

const { connectDB } = require("./config/db");
const { Sport } = require("./models/Sports.model");
const User = require("./models/User.model");

const run = async () => {
  await connectDB();

  const sportsData = [
    { name: "Bowling", icon: "🎳" },
    { name: "Basketball", icon: "🏀" },
    { name: "Flag Football", icon: "🏈" },
    { name: "Pickleball", icon: "🏓" },
  ];

  for (const s of sportsData) {
    await Sport.findOneAndUpdate({ name: s.name }, s, { upsert: true });
  }
  console.log("Sports seeded");

  const adminEmail = "admin@votedude.com";
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: "admin123",
      role: "admin",
      provider: "local",
    });
    console.log(
      "Admin user created: admin@votedude.com / admin123 (change this password!)"
    );
  } else {
    console.log("Admin user already exists");
  }

  console.log("Seed complete");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
